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
- 

## 04. Criando o Módulo de Cursos e Usando Roteamento com Lazy Loading

## 05. Customizando o Tema do Angular Material