import { makeAutoObservable } from 'mobx';
import { ImageInfo } from '../components/AppImage/AppImage';

class AppStore {
	public imagesInfos: ImageInfo[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setImagesInfos(imagesInfos: ImageInfo[]): void {
		this.imagesInfos = imagesInfos;
	}

	get rows() {
		return this.imagesInfos.map(({ name, width, height, binarizedTime }) => ({
			name,
			width,
			height,
			pixels: width * height,
			binarizedTime,
		}));
	}
}

export default new AppStore();
