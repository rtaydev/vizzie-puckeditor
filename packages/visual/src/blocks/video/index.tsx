import { ComponentConfig } from '@measured/puck';
import { Video } from 'lucide-react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';

export type VideoProps = WithLayout<
	SectionStyleProps & {
		url: string;
		aspectRatio: '16:9' | '4:3' | '1:1' | 'auto';
		autoplay: boolean;
		loop: boolean;
		muted: boolean;
		controls: boolean;
	}
>;

// Extract video ID from YouTube URL
const getYouTubeId = (url: string): string | null => {
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
		/youtube\.com\/watch\?.*v=([^&\n?#]+)/,
	];
	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match && match[1]) return match[1];
	}
	return null;
};

// Extract video ID from Vimeo URL
const getVimeoId = (url: string): string | null => {
	const patterns = [/(?:vimeo\.com\/)(\d+)/, /(?:vimeo\.com\/video\/)(\d+)/];
	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match && match[1]) return match[1];
	}
	return null;
};

// Detect video type from URL
const getVideoType = (url: string): 'youtube' | 'vimeo' | 'direct' | null => {
	if (!url) return null;
	if (getYouTubeId(url)) return 'youtube';
	if (getVimeoId(url)) return 'vimeo';
	if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) return 'direct';
	return null;
};

const VideoInner: ComponentConfig<VideoProps> = {
	fields: {
		url: {
			type: 'text',
			label: 'Video URL',
			labelIcon: <Video size={16} />,
		},
		aspectRatio: {
			type: 'select',
			label: 'Aspect Ratio',
			options: [
				{ label: '16:9', value: '16:9' },
				{ label: '4:3', value: '4:3' },
				{ label: '1:1', value: '1:1' },
				{ label: 'Auto', value: 'auto' },
			],
		},
		autoplay: {
			type: 'radio',
			label: 'Autoplay',
			options: [
				{ label: 'Yes', value: true },
				{ label: 'No', value: false },
			],
		},
		loop: {
			type: 'radio',
			label: 'Loop',
			options: [
				{ label: 'Yes', value: true },
				{ label: 'No', value: false },
			],
		},
		muted: {
			type: 'radio',
			label: 'Muted',
			options: [
				{ label: 'Yes', value: true },
				{ label: 'No', value: false },
			],
		},
		controls: {
			type: 'radio',
			label: 'Show Controls',
			options: [
				{ label: 'Yes', value: true },
				{ label: 'No', value: false },
			],
		},
		...sectionFields,
	},
	defaultProps: {
		url: '',
		aspectRatio: '16:9',
		autoplay: false,
		loop: false,
		muted: false,
		controls: true,
	},
	render: ({
		url,
		aspectRatio,
		autoplay,
		loop,
		muted,
		controls,
		sectionStyle,
	}) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const videoType = getVideoType(url || '');
		const aspectRatioStyles = {
			'16:9': { paddingBottom: '56.25%' },
			'4:3': { paddingBottom: '75%' },
			'1:1': { paddingBottom: '100%' },
			auto: { paddingBottom: '0' },
		};

		const renderVideo = () => {
			if (!url) {
				return (
					<div
						style={{
							width: '100%',
							aspectRatio: aspectRatio === 'auto' ? undefined : aspectRatio,
							background: '#f3f4f6',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '6px',
							color: '#9ca3af',
							minHeight: '200px',
						}}
					>
						<div style={{ textAlign: 'center' }}>
							<Video size={48} style={{ marginBottom: '8px' }} />
							<div>Enter a video URL</div>
						</div>
					</div>
				);
			}

			if (videoType === 'youtube') {
				const videoId = getYouTubeId(url);
				if (!videoId) return null;

				const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams(
					{
						autoplay: autoplay ? '1' : '0',
						loop: loop ? '1' : '0',
						mute: muted ? '1' : '0',
						controls: controls ? '1' : '0',
					}
				).toString()}`;

				return (
					<div
						style={{
							position: 'relative',
							width: '100%',
							...aspectRatioStyles[aspectRatio],
							overflow: 'hidden',
							borderRadius: '6px',
						}}
					>
						<iframe
							src={embedUrl}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								border: 'none',
							}}
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						/>
					</div>
				);
			}

			if (videoType === 'vimeo') {
				const videoId = getVimeoId(url);
				if (!videoId) return null;

				const embedUrl = `https://player.vimeo.com/video/${videoId}?${new URLSearchParams(
					{
						autoplay: autoplay ? '1' : '0',
						loop: loop ? '1' : '0',
						muted: muted ? '1' : '0',
						controls: controls ? '1' : '0',
					}
				).toString()}`;

				return (
					<div
						style={{
							position: 'relative',
							width: '100%',
							...aspectRatioStyles[aspectRatio],
							overflow: 'hidden',
							borderRadius: '6px',
						}}
					>
						<iframe
							src={embedUrl}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								border: 'none',
							}}
							allow='autoplay; fullscreen; picture-in-picture'
							allowFullScreen
						/>
					</div>
				);
			}

			if (videoType === 'direct') {
				return (
					<div
						style={{
							position: 'relative',
							width: '100%',
							...aspectRatioStyles[aspectRatio],
							overflow: 'hidden',
							borderRadius: '6px',
						}}
					>
						<video
							src={url}
							controls={controls}
							autoPlay={autoplay}
							loop={loop}
							muted={muted}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					</div>
				);
			}

			return (
				<div
					style={{
						width: '100%',
						padding: '2rem',
						background: '#f3f4f6',
						borderRadius: '6px',
						textAlign: 'center',
						color: '#9ca3af',
					}}
				>
					Invalid video URL. Please provide a YouTube, Vimeo, or direct video
					URL.
				</div>
			);
		};

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal || '0rem'}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth}
			>
				{renderVideo()}
			</Section>
		);
	},
};

export const VideoBlock: ComponentConfig<VideoProps> = withLayout(VideoInner);
