/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText, getColorClassName, getFontSizeClass } = wp.blockEditor;

const save = ( { attributes } ) => {
	const {
		buttonColor,
		buttonText,
		customButtonColor,
		customTextColor,
		content,
		customFontSize,
		fontSize,
		textColor,
		textAlign,
		url,
		via,
	} = attributes;

	const viaUrl = via ? `&via=${ via }` : '';

	const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=${ url }${ viaUrl }`;

	const textColorClass = getColorClassName( 'color', textColor );

	const fontSizeClass = getFontSizeClass( fontSize );

	const textClasses = classnames( 'wp-block-coblocks-click-to-tweet__text', {
		'has-text-color': textColor || customTextColor,
		[ fontSizeClass ]: fontSizeClass,
		[ textColorClass ]: textColorClass,
	} );

	const textStyles = {
		fontSize: fontSizeClass ? undefined : customFontSize,
		color: textColorClass ? undefined : customTextColor,
	};

	const buttonColorClass = getColorClassName( 'background-color', buttonColor );

	const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
		'has-button-color': buttonColor || customButtonColor,
		[ buttonColorClass ]: buttonColorClass,
	} );

	const buttonStyles = {
		backgroundColor: buttonColorClass ? undefined : customButtonColor,
	};

	return (
		! RichText.isEmpty( content ) && (
			<blockquote style={ { textAlign: textAlign } }>
				<RichText.Content
					tagName="p"
					className={ textClasses }
					style={ textStyles }
					value={ content }
				/>
				<RichText.Content
					tagName="a"
					className={ buttonClasses }
					style={ buttonStyles }
					value={ buttonText }
					href={ tweetUrl }
					target="_blank"
					rel="noopener noreferrer"
				/>
			</blockquote>
		)
	);
};

export default save;
