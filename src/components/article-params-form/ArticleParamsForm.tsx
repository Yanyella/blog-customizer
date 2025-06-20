import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';
import { Component, createRef } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

// описание структуры пропсов

type ArticleProps = {
	onChange: (state: ArticleStateType) => void;
};

// описание структуры состояния компонента

type ArticleState = {
	isOpen: boolean;
	formState: ArticleStateType;
};

// класс ArticleParamsForm
export class ArticleParamsForm extends Component<ArticleProps, ArticleState> {
	private formRef = createRef<HTMLDivElement>();

	constructor(props: ArticleProps) {
		super(props);
		this.state = {
			isOpen: false,
			formState: defaultArticleState,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClick);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick);
	}

	// закрытие формы при клике по оверлей

	handleClick = (event: MouseEvent) => {
		if (
			this.state.isOpen &&
			this.formRef.current &&
			!this.formRef.current.contains(event.target as Node)
		) {
			this.toggleForm();
		}
	};

	// переключение меню

	toggleForm = () => {
		this.setState((prev) => ({
			isOpen: !prev.isOpen,
		}));
	};

	// функция обновления формы

	handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		this.setState((prev) => ({
			formState: {
				...prev.formState,
				[key]: value,
			},
		}));
	};

	// функция выбора стилей

	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		this.props.onChange(this.state.formState);
		this.setState({ isOpen: false });
	};

	// функция сброса до дефолтных стилей

	handleReset = () => {
		this.setState({
			formState: defaultArticleState,
		});
		this.props.onChange(defaultArticleState);
	};

	render() {
		const { isOpen, formState } = this.state;
		return (
			<>
				<ArrowButton isOpen={isOpen} onClick={this.toggleForm} />
				<aside
					aria-hidden={!isOpen}
					ref={this.formRef}
					className={clsx(styles.container, isOpen && styles.container_open)}>
					<form
						className={styles.form}
						onSubmit={this.handleSubmit}
						onReset={this.handleReset}>
						<Text as='h1' size={45} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								this.handleChange('fontFamilyOption', option)
							}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => this.handleChange('fontSizeOption', option)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) => this.handleChange('fontColor', option)}
						/>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								this.handleChange('backgroundColor', option)
							}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) => this.handleChange('contentWidth', option)}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={this.handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</>
		);
	}
}
