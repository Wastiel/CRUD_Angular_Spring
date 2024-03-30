# Lista de Cursos - Angular 

## 01. Criando Material Table para Listar Cursos
[link da Aula](https://youtu.be/LvYXiOh3vZ4)
- Vamos criar uma lista de cursos, para mostrar todos os cursos disponíveis.
- Vamos utilizar a tabela do mterial
	- importamos a tabela no nosso módulo
	- import {MatTableModule} from '@angular/material/table';
- Vamos primeiramente preencher a nossa tabela
	- pegamos a tabela de exepmlo do material e vamos preencher ela com um exemplo simles.
- Vamos criar uma interface para ser um modelo de dados
	- Utilizamos para criar uma interaface. 
        ````ts
            export interface Course {
            _id: string
            name: string;
            category: string;
            }
        ````
- Criamos a referencia para a nossa interface, através de uma variavel
	- courses: Course[] = [];
	- Esta mesma variavel utilizamos no apontamento da tabela no html
- Ajustamos a tabela da seguinte maneira
	````html
		<table mat-table [dataSource]="courses" class="mat-elevation-z8">

		<!--- Note that these columns can be defined in any order.
				The actual rendered columns are set as a property on the row definition" -->

		<!-- Name Column -->
		<ng-container matColumnDef="name">
			<th mat-header-cell *matHeaderCellDef>Curso </th>
			<td mat-cell *matCellDef="let course"> {{ course.name}} </td>
		</ng-container>

		<!-- category Column -->
		<ng-container matColumnDef="name">
			<th mat-header-cell *matHeaderCellDef> Categoria </th>
			<td mat-cell *matCellDef="let course"> {{ course.category }} </td>
		</ng-container>

		<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
		<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
		</table>
	````
	- displayedColumns = ['name', 'category'];
	- O funcionamento da tabela não tem uma complexidade grande.
		- cada bloco representa um elemento databela.
		- Primeiramente temos a que intrface está representado a tabela
		- Depois temos as colunas pegando os elementos da variavel course
		- Posterior temos as colunas que serao mostradas
- 

## 02. CSS do Material Table e Criando um Módulo App Material
[link da Aula](https://youtu.be/jjv5YZhPjfc)
- Vamos criar um modulo compartilhado com imports e exports, para poddermos utilizar de forma compartilhada 
- <mat-card><mat-card-content></mat-card-content></mat-card>
	- Criamos um container, para organizar melhor os elementos em tela.
	- Nunca esquecer de colocar o content, que é o conteudo do card
	- Temos que importar nos módulos que achamaos necessários utilizar
- Criamos uma tolbar dentro da nossa aplicação
	````html
		<mat-card>
			<mat-card-content>
			<mat-toolbar color="primary">Crusos Disponíveis</mat-toolbar>
			<table mat-table [dataSource]="courses" class="mat-elevation-z8">
			<!-- Name Column -->
			<ng-container matColumnDef="name">
				<th mat-header-cell *matHeaderCellDef>Curso </th>
				<td mat-cell *matCellDef="let course"> {{ course.name}} </td>
			</ng-container>
			<!-- category Column -->
			<ng-container matColumnDef="category">
				<th mat-header-cell *matHeaderCellDef> Categoria </th>
				<td mat-cell *matCellDef="let course"> {{ course.category }} </td>
			</ng-container>
			<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
			</table>
		</mat-card-content>
		</mat-card>
	````
- Vamos criar um modulo compartilhado para organizar os imports.
	- ng g m shared/app-material
	- Dentro vamos ficar com todos os imports do angular
	````ts
		import { NgModule } from '@angular/core';
		import { MatCardModule } from '@angular/material/card';
		import { MatTableModule } from '@angular/material/table';
		import { MatToolbarModule } from '@angular/material/toolbar';

		@NgModule({
		exports: [
			MatTableModule,
			MatToolbarModule,
			MatCardModule
		],
		})
		export class AppMaterialModule { }
	````
	- Depois ajustamos o nosso courses modulecom o import do app-material
	````ts
		import { AppMaterialModule } from '../shared/app-material/app-material.module';
		@NgModule({
		declarations: [
			CoursesComponent
		],
		imports: [
			CommonModule,
			CoursesRoutingModule,
			AppMaterialModule
		]
		})
		export class CoursesModule { }
	````
- Assim o apontamento ocorre de um módulo especifico para outro. 

## 03. Criando um Service no Angular
[link da Aula](https://youtu.be/76fUSr1nSDM)
- Uma classe de serviços do angular, para apontar para o nosso course
- No nosso componente, são elementos que vamos renderizar e algumas validações.
- Lógica vamos colocar no serviço
- Criando o servico
	- ng g s courses/services/courses
	- O anotation do serviço é o @injectable
- Serviço vai passar a informação dos dados que vao ser renderizados
	- De onde os dados estão vindo, é irrelevante. 
	- O componente não precisa saber ele abstrai
	- No serviço vamos tentar manipular os dados, do jeito que o componente deseja
- Ajustamos o nosso serviço para retornar um dado mocado. 
- Chamamos o serviço através de uma injeção de dependencias no local que vamos utilizar o mesmo.
- Utilizamos o httpClient para injeção do serviço como um todo. 
- Angular forneçe a instancia da classe automáticamente
	````ts
		import { Injectable } from '@angular/core';
		import { HttpClient } from '@angular/common/http'

		import { Course } from '../model/course';

		@Injectable({
		providedIn: 'root'
		})
		export class CoursesService {

		constructor(private httpClient: HttpClient) { }

		list(): Course[]{
			return[
			{_id: '1', name: 'Angular', category: 'Front-End'}
			];
		}
		}
	````
	- o @injectable, forneçe uma instancia, para a classe utilizar. 
- A instancia da classe é fornecida na raiz do projeto (Em função do provideIN): root
	````ts
		@Injectable({
	providedIn: 'root'
	})
	````
- Importamos o httpclient de forme global, pq todos vao uzar.
	- HttpClientModule
	- import { HttpClientModule } from '@angular/common/http';
- Injeção do serviço, diretamente no componente. 

## 04. Chamada HTTP Get no Angular e RXJS
[link da Aula](https://youtu.be/LUUn1BWIUA8)
- Vamos criar o serviço
- Vamos criar um curso.json dentro da pasta assets para simular um acesso ao backend.
	````json
		{"_id": "1", "name": "Angular", "category": "Front-End"}
	````
- Vamos utiliar o httpclient com os determinados padrões 
- Ao invez de utilizarmos uma api fake, vamos utilizar um apontamento para um arquivo json.
	````ts
		@Injectable({
		providedIn: 'root'
			})
			export class CoursesService {

			private readonly API = '/assets/cursos.json'
			constructor(private httpClient: HttpClient) { }

			list(){
				return this.httpClient.get<Course[]>(this.API);
			}
		}
	````
	- O json, retorna um obsarvble, onde setamos que este obsarvble vai ser uma lista de cursos. 
- Ajustmaos o nosso componente courses
	````ts
		@Component({
		selector: 'app-courses',
		templateUrl: './courses.component.html',
		styleUrls: ['./courses.component.scss']
		})
		export class CoursesComponent implements OnInit {

		courses: Observable<Course[]>;

		displayedColumns = ['name', 'category'];

		constructor(private CoursesService: CoursesService){
		this.courses = this.CoursesService.list();
		}

		ngOnInit(){
		}
	````
- Vamos usar a funcionalidade tap para debugar a nossa aplicação
	````ts
		list(){
		return this.httpClient.get<Course[]>(this.API)
		.pipe(
		tap((courses)=>console.log(courses))
		);
  	}
	````
	- com o pipe, podemos usar e transformar os dados. como cano, conseguimos pegar informações para debug, coomo assima com o debug do console.log
- A ideia de obter a lista de cursos, deixando o angular tratar os dados da melhor maneira e evitando o subscribe. 
- take(1), encerramos a chamada, destruimos a chamada, pq so recebemos os dados e não preciamos deixar a conexão aberta. 
- first(), pegamos 

## 05. Lista de Cursos: Spinner (Carregando)
[link da Aula](https://youtu.be/vOz_o7oYv9I)
- Vamos criar um spiner para colocar em tela caso estejamos aguardando os cursos carregando
- Precisamos disto em função da velcoidade de conexão ou lag das conexões. 
- Vamos utilizar o componente spiner
	````ts
		  <mat-progress-spinner
			class="example-margin"
			[color]="color"
			[mode]="mode"
			[value]="value">
		</mat-progress-spinner>
	````
	- Colocamos a importação do spiner dentro do nosso módulo geral do material
	- import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
- Vamos criar um async para controlar se ha dados em cursos 
- No angular, por convenção quando a variavel tiver um dolar atras (courses$) ela é um observable
- Refatoramos a maneira de mostrar os dados em tela:
	- disto: <table mat-table [dataSource]="courses" class="mat-elevation-z8">
	- para isto: <div *ngIf="courses$ | async as courses">
	- Agora quem chama os dados em tela é o próprio aysinc do angular. Então se ele tiver mudanças, avalia e traz em tela.
- Com isto construimos a lógica para caso nao ter dados, mostra outro componente
	````ts
		<div *ngIf="courses$ | async as courses; else loading">
			// conteudo
		</div>
		<ng-template #loading>
			<mat-spinner></mat-spinner>
		</ng-template>
	````
- Criamos uma div para formatar o nosso spinner do curso
	````css
		.loading-spinner {
		padding: 25px;
		background: rgba(0,0,0,0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		}
	````
- Falta tratarmos se a api estiver inassesivel. 
## 06. Lista de Cursos: Tratamento de Erros e MatDialog
[link da Aula](https://youtu.be/gi0ZJ8-r6IM)
- Tratamento de erro no projeto 
- Configuramos o erro dentro da nossa chamada:
	````ts
		  this.courses$ = this.CoursesService.list()
		.pipe(
		catchError(error => {
			return of([])
		})
		);
	````
- Quando tratamos o erro na chamada do serviço, não mandamos uma informação incorreta para o usuário 
	- Neste caso a inofrmação incorreta, seria o spiner girando eternament. 
- Vamos colocar uma popup (dialog), para sinalizar o erro
- vamos criar um módulo para utilizar este componente customizavel.
	- ng g m shared/shared
- Criamos o componente compartilhado da dialog
	- ng g c shared/components/error-dialog
- Quando criamos o modulo compartilhado, temos que exportar os componente que vao ser usados em toda a aplicação
	- Temos que ter cuidado para que o componente não esteja sendo usado em mais de um modulo, gerando erro
	````ts
		import { NgModule } from '@angular/core';
		import { CommonModule } from '@angular/common';
		import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

		@NgModule({
		declarations: [
			ErrorDialogComponent
		],
		imports: [
			CommonModule
		],
		exports:[ErrorDialogComponent]
		})
		export class SharedModule { }
	````
- Colocamos a importação da dialog dentro do nosso modulo que compartilha os componetes
	- import {MatDialogModule} from '@angular/material/dialog';
- também colocamos o nosso módulo de componentes genéricos dentro da nossa shared module
	- AppMaterialModule
	````ts
		imports: [
		CommonModule,
		AppMaterialModule
	],
	````
- Dentro do nosso componente, vamos fazer a injeção do dialog
	- constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
- Pegamos o dialog e injetmos no nosso curso, passando uma mensagem de erro
	````ts
		export class CoursesComponent implements OnInit {

		courses$: Observable<Course[]>;

		displayedColumns = ['name', 'category'];

		constructor(private CoursesService: CoursesService, public dialog: MatDialog){
		this.courses$ = this.CoursesService.list()
			.pipe(
			catchError(error => {
				this.onError('erro ao carregar cursos')
				return of([])
			})
			);
		}

		onError(erroMsg: string) {
			this.dialog.open(ErrorDialogComponent, {
			data: erroMsg
			});
		}

		ngOnInit(){
		}

		}
	````
- Colocamos uma modal mais completa
	````ts
		<h1 mat-dialog-title>Erro! </h1>
			<div mat-dialog-content>{{data}}</div>
			<div mat-dialog-actions>
			<button mat-button mat-dialog-close>Close</button>
		</div>
	````
- importamos o botao para o nosso componente mais genérico:
	- import {MatButtonModule} from '@angular/material/button';
	- MatButtonModule
- Agora ao dar erro no nosso componente, acontece um problema. 
 
## 07. Lista de Cursos: Pipe para mostrar ícone
[link da Aula](https://youtu.be/uNFIh3jvp34)
- Vamos fazer uma pipe para mostrar icone de curso. 
- Vamos utilizar o componente icone do material
 - import {MatIconModule} from '@angular/material/icon';
 - MatIconModule
- vamos usar pipe para transformar valores no angular
	- ng g pipe shared/pipes/category
	- Vamos gerar compartilhado para todos poderem utilizar.
- Esta classe implementa uma interface do angular
- Dentro do pipe, criamos a seguinte lógica de tradução
	````ts
	import { Pipe, PipeTransform } from '@angular/core';
		@Pipe({
		name: 'category'
		})
		export class CategoryPipe implements PipeTransform {

		transform(value: string): string {
			switch(value){
			case 'front-end': return 'code';
			case 'back-end': return 'computer';
			}
			return 'code';
			}
		}

	````
- No nosso HTML, realizamos a seguinte ação
	````html
	    <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef> Categoria </th>
        <td mat-cell *matCellDef="let course">{{ course.category }}
          <mat-icon aria-hidden ="Category do Curso">{{ course.category | category}}</mat-icon></td>
      </ng-container>
	````
- A sacada neste ponto é pegar o nome do icone e colocar dentro do add icon
- Proxima etapa começamos com spring.