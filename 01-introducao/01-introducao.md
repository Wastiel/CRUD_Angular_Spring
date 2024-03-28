# Introdução

## 01. Introdução e Criação do Projeto Angular
- Vamos criar uma aplicação CRUD
	- Com todas as operações, criação, exclusão, alteração e listagem.
- Vamos usar Angular para o front end
- Vamos usar o Spring para o back-end
- Instalamos o npm para gerenciamento de pacotes
	- [Node JS](https://nodejs.org/en)
	- Focar sempre na versão LTS
	- node -v para verificar a versão do node.
- Instalar o angular
	- npm install -g @angular/cli
	- ng --version para ver a versão do angular
- Criação do Projeto
	- Vamos esperar o projeto em 2 (Spring e angular)
	- Criamos uma pasta CRUD_Angular_Spring
		- dentro do diretório criado, iniciamos o nosso projeto
		- ng new crud-angular
			- com rodas
			- scss
- Vamos usar o VSCode
	- Extensões VSCode
	- Angular Extension Pack - Loiane

## 02. Overview do Projeto e Instalando o Angular Material
- Validando o projeto e instalando o angular Material
	- Testes
	- Pacotes
- Revisao do package.json
	- sctrict true, muda como inicializa as variaveis
	- Variaveis mudam em função do typeScritp
	- src/assets somente imagens
	- budgets
		- Contrato de tamanho
		- Não extrapolar o determinado tamanho
- Iniciamos o projeto com ng-serve
- Compilação incremental
	- Recompila somente o que foi alterado.
- Instalar o angular material
	- (Angular Material)[https://material.angular.io/]
	- ng add @angular/material
	- Vamos usar o indigo/pink, mas vamos customizar algumas coisas mais a frente
	- Setamos o material typography como global
	- abilitamos as animações do angular Material
	- Atualizou alguns arquivos
	- Podemos configurar a fonte caso necessário como parte do projeto e não no index.
- 

## 03. Criando uma Toolbar na Página Principal
- Vamos criar a página inicial do nosso projeto
	- Vamos criar uma toolbar
- Entramos no site do angular Material
- (Angular Material)[https://material.angular.io/]
	- Posterior vamos pegar a toolbar
	- Import da toolbar
		- import {MatToolbarModule} from '@angular/material/toolbar';
	- Pegamos o codigo de um toolbar simples e colocamos no nosso app.component.html
		````html
		  <mat-toolbar>
		    <span>My Application</span>
		  </mat-toolbar>
		````

## 04. Criando o Módulo de Cursos e Usando Roteamento com Lazy Loading
- Vamos renderizar uma lista de cursos na parte principal da página
- Criamos o modulo de courses
	- ng g m courses -routing
- Vamos criar um componente de módulos
- Criamos o componente 
	- ng g c courses/courses
- Vamos configurar o arquivo de rotas
	- Quando acessarmos a raiz, vamos acessar a lista de cursos
	- Editamos a nossa rota filha (courses module, )
	````typeScript
		const routes: Routes = [
		{path: '', component: CoursesComponent}
		];
	````
	- com isto quando form um caminho em branco, realizamos o apontamento
	- Edtiamos a nossa rota mãe:
	````typescript
		const routes: Routes = [
		{path: '', pathMatch: 'full', redirectTo: 'courses'},
		{path: 'courses',
			loadChildren: () => import('./courses/courses.module').then(m =>m.CoursesModule)}
		];
	````
		- Fazemos o apontamento para a rota filha, dizendo que quando for em branco, apontar para a rota courses, que é o apontamento configurado como courses.
	- Se adicionarmos mais modulos ao nosso projeto, colocamos dentro do nosso courses module
- Colocamos o apontamento <router-outlet></router-outlet>

## 05. Customizando o Tema do Angular Material
- Vamos customizar as cores do angular material

[Guide cores Material](https://material.angular.io/guide/theming)

- Criamos o projeto e selecionamos uma cor padrão que vem no indigo & pink
	- Vamos customizar este tema. 
	- Vamos usar o material Design para usar de paletas.
	- Angular material usa scss
	- Vamos usar a paleta indigo 50 e blue 50
- Vamos fazer as alterções em tempo real, deixamos o ng serve, para ficar mais facil de entender o fluxo.
- Começamos com um import dentro do styles.scss.
	````Scss
	@use '@angular/material' as mat;

	// Importe os estilos básicos do Angular Material
	@include mat.core();

	// Defina suas próprias paletas de cores personalizadas
	$custom-primary: mat.define-palette(mat.$blue-palette);
	$custom-secondary: mat.define-palette(mat.$indigo-palette, A200, A400, 700);
	$custom-warn: mat.define-palette(mat.$red-palette);

	// Crie o tema personalizado
	$custom-theme: mat.define-light-theme((
	color: (
		primary: $custom-primary,
		accent: $custom-secondary,
		warn: $custom-warn
	),
	typography: mat.define-typography-config(),
	density: 0,
	));

	// Aplicar o tema personalizado a todos os componentes do Angular Material
	@include mat.all-component-themes($custom-theme);
	````
	- Configuramos as cores primarias e secundarias e de alerta dentro do material. Seguimos muito a documentação.
