import { Injectable } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class ObjectDetectionService {
  model: cocoSsd.ObjectDetection | undefined;

  constructor() {
    this.loadModel();
  }

  async loadModel() {
    await tf.setBackend('webgl');
    await tf.ready(); 
    this.model = await cocoSsd.load();
  }

  async detectObjects(image: HTMLCanvasElement) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }
    return await this.model.detect(image);
  }
}
