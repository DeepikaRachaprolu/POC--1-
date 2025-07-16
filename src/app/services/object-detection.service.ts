import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectDetectionService {
  private model: any;
  private tf: any;

  constructor() {}

  async loadModel(): Promise<void> {
    if (!this.model) {
      this.tf = await import('@tensorflow/tfjs');
      await this.tf.setBackend('webgl');
      await this.tf.ready();

      const cocoSsd = await import('@tensorflow-models/coco-ssd');
      this.model = await cocoSsd.load();
      console.log('Model loaded.');
    }
  }

  async detectObjects(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): Promise<any[]> {
    if (!this.model) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }
    return this.model.detect(image);
  }
}
