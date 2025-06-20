import { CSSProperties, useState } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const variableCss = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	};

	return (
		<main className={styles.main} style={variableCss as CSSProperties}>
			<ArticleParamsForm initState={articleState} onChange={setArticleState} />
			<Article />
		</main>
	);
};
