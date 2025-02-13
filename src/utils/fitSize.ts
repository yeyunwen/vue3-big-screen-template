//定义设计稿的宽高
const designWidth = 1920;
const designHeight = 1080;

// px转vw
export const px2vw = (_px: number) => {
	return (_px * 100.0) / designWidth + "vw";
};
// px转vh
export const px2vh = (_px: number) => {
	return (_px * 100.0) / designHeight + "vh";
};

export const fitChartSize = (size: number, defalteWidth = 1920) => {
	const clientWidth =
		window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (!clientWidth) return size;
	const scale = clientWidth / defalteWidth;
	return Number((size * scale).toFixed(3));
};
