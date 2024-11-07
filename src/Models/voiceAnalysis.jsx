import * as tf from '@tensorflow/tfjs';

let loadedModel = null;

const generateData = () => {
    const data = [];
    const labels = [];

    for (let i = 0; i < 1000; i++) {
        const volume = Math.random() * 255;
        const clarity = Math.random();
        const pitch = Math.random() * 500;
        const confidence = (0.4 * (volume / 255)) + (0.4 * clarity) + (0.2 * (pitch / 500));

        data.push([volume, clarity, pitch]);
        labels.push([confidence * 100]);
    }
    return { data, labels };
};

const { data, labels } = generateData();
const trainingData = tf.tensor2d(data, [data.length, 3]);
const targetData = tf.tensor2d(labels, [labels.length, 1]);

export const model = tf.sequential();

model.add(tf.layers.dense({ inputShape: [3], units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({
    optimizer: tf.train.adam(),
    loss: 'meanSquaredError',
    metrics: ['mse'],
});

let isTraining = false;

export async function trainModel() {
    if (isTraining) return;
    try {
        isTraining = true;

        await model.fit(trainingData, targetData, {
            epochs: 50,
            batchSize: 32,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, val_loss = ${logs.val_loss.toFixed(4)}`);
                },
            },
        });

        await model.save('indexeddb://my-model');
        console.log('Model saved to IndexedDB');
    } catch (error) {
        console.error('Error during training or saving the model:', error);
    } finally {
        isTraining = false;
    }
}

export async function loadModel() {
    try {
        loadedModel = await tf.loadLayersModel('indexeddb://my-model');
        console.log('Model loaded from IndexedDB');
    } catch (error) {
        console.error('Error loading the model from IndexedDB:', error);
    }
}


export async function predictConfidence(volume, clarity, pitch) {
    if (!loadedModel) {
        console.error('Model not loaded!');
        return null;
    }

    const inputTensor = tf.tensor2d([[volume, clarity, pitch]], [1, 3]);
    const prediction = loadedModel.predict(inputTensor);
    const confidence = prediction.dataSync()[0];

    tf.dispose([inputTensor, prediction]);
    return confidence.toFixed(2);
}