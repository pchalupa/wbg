import React from 'react';
import styles from './FacebookVideo.module.scss';

function FacebookVideo(props) {
	return (
		<iframe
			title="Video"
			className={styles.video}
			src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwaterbouldergames%2Fvideos%2F413009075775419%2F&show_text=0&width=560"
			scrolling="no"
			frameborder="0"
			allowTransparency="true"
			allowFullScreen="true"></iframe>
	);
}

export default FacebookVideo;
