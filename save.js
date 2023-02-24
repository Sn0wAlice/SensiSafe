/**
 * Saved scripts
 */

async function saveProcessedImage(inImage, outImage, data) {
    if (!data) return false;
    return new Promise(async (resolve) => { // eslint-disable-line no-async-promise-executor
        const original = await loadImage(inImage); // load original image
        const c = new Canvas(original.width, original.height); // create canvas
        const ctx = c.getContext('2d');
        ctx.drawImage(original, 0, 0, c.width, c.height); // draw original onto output canvas
        for (const obj of data.parts) { // draw all detected objects
            if (composite.nude.includes(obj.id) && options.blurNude) {
                blur({
                    canvas: c,
                    left: obj.box[0],
                    top: obj.box[1],
                    width: obj.box[2],
                    height: obj.box[3],
                });
            }
            rect({
                canvas: c,
                x: obj.box[0],
                y: obj.box[1],
                width: obj.box[2],
                height: obj.box[3],
                title: `${Math.round(100 * obj.score)}% ${obj.class}`,
            });
        }
        const out = fs.createWriteStream(outImage); // write canvas to jpeg
        out.on('finish', () => {
            if (options.debug) log.state('created output image:', outImage);
            resolve(true);
        });
        out.on('error', (err) => {
            log.error('error creating image:', outImage, err);
            resolve(true);
        });
        const stream = c.createJPEGStream({
            quality: 0.6,
            progressive: true,
            chromaSubsampling: true
        });
        stream.pipe(out);
    });
}


// load graph model and run inference
async function runDetection(input, output) {
    const t = {};
    if (!models[options.modelPath]) { // load model if not already loaded
        try {
            models[options.modelPath] = await tf.loadGraphModel(options.modelPath);
            models[options.modelPath].path = options.modelPath;
            if (options.debug) log.state('loaded graph model:', options.modelPath);
        } catch (err) {
            log.error('error loading graph model:', options.modelPath, err.message, err);
            return null;
        }
    }
    t.input = getTensorFromImage(input); // get tensor from image
    [t.boxes, t.scores, t.classes] = await models[options.modelPath].executeAsync(t.input, options.outputNodes); // run prediction
    const t0 = process.hrtime.bigint();
    const res = await processPrediction(t.boxes, t.scores, t.classes, t.input); // parse outputs
    const t1 = process.hrtime.bigint();
    Object.keys(t).forEach((tensor) => tf.dispose(t[tensor])); // free up memory
    await saveProcessedImage_NO_BLUR(input, output, res); // save processed image and return result
    log.state(`done: model:${options.modelPath} time:${(t1 - t0) / 1000n / 1000n} input:${input} output:${output} objects:`, res.parts?.length);
    return res;
}