# CRUD_Angular_Spring


# Comandos VScode

- CTRL + shift + P
    - TS Hero: Organize imports (sort and remove unused)
        - Organiza os imports do angular

# Comandos Angular
- Instalamos o npm para gerenciamento de pacotes
	- [Node JS](https://nodejs.org/en)
	- Focar sempre na versão LTS
	- node -v para verificar a versão do node.
- Instalar o angular
	- npm install -g @angular/cli
	- ng --version para ver a versão do angular
- Projeto    
    - ng serve para iniciar o projeto
- angular Material
    - (Angular Material)[https://material.angular.io/]
    - ng add @angular/material
	- Vamos usar o indigo/pink, mas vamos customizar algumas coisas mais a frente
	- Setamos o material typography como global
	- abilitamos as animações do angular Material
- Importe toolbar
    - import {MatToolbarModule} from '@angular/material/toolbar';
    - Toolbar Simples
        ````html
              <mat-toolbar>
                <span>My Application</span>
            </mat-toolbar>
        ````
    - importe table
    - MatTableModule import {MatTableModule} from '@angular/material/table';
- ng g interface courses/model/course
    - Utilizamos para criar uma interaface. 
        ````ts
            export interface Course {
            _id: string
            name: string;
            category: string;
            }
        ````
- ng g s courses/services/courses
- import { HttpClient } from '@angular/common/http'
    - constructor(private httpClient: HttpClient) { }
    - Tipo uma utilização de um ajax.
	- o @injectable, forneçe uma instancia, para a classe utilizar. 
- A instancia da classe é fornecida na raiz do projeto
	````ts
		@Injectable({
	providedIn: 'root'
	})
	````
# Comandos SPRING

- Instalar maven e java
    - Ambos fazer apontamento de variavel de ambiente. 
- Utilizar o spring start para gerar o projeto
    - [START SPRING](https://start.spring.io/)
    - Segui as seguintes configurações
    - Project:
        maven
    - Lenguage
        - Java
    - Spring Boot:
        - 3.2.5 (Snapshot)
    - Project Metadata
        - Group: com.loiane
        - Artifact: crud-spring
        - Java: 17
    - Dependencias:
        - Spring Web
        - Lombok
        - Spring Data JPA
        - H2 Database
        - Spring Boot Dev Tools
- @RestController
    - fala pro spring que esta classa contem um endpoint
    - é um javasarvlet, tem as operações put, get e assim por diante
- @RequestinMapping("/api/courses")
    - Caminho da nossa APi 
- @Getmapping
    - sinaliza que temos um metodo get
- Lombok:
    - @Getter
        - Gera todos os Get's 
    - @Setter
        - Gera todos os Set's        
    - @Data
        - Gera todos os Get's, Sets e construturo da determinada classe.
- @Entity
    - Dizemos que esta entidade está amarrada ao banco de dados
- @Table(name = "cursos")
    - Dizemos que esta entidade está amarrada a uma tabela do banco de dados em especifica.     
    - @Id
        - Dizemos que aquele registro é o ID do banco
    @GeneratedValue(strategy = GenerationType.AUTO)
        - Dizemos que o ID vai gerar automaticamente
- @Table(name = "cursos")
    - Dizemos que esta entidade está amarrada a uma tabela do banco de dados em especifica. 
    - @Id
        - Dizemos que aquele registro é o ID do banco
    - @GeneratedValue(strategy = GenerationType.AUTO)
        - Dizemos que o ID vai gerar automaticamente
    - @Column(name = "nome")
        - Direcionamos par auma coluna do banco de dados especifica
    - @Column(length = 200, nullable = false)
- Com o lombok conseguimos replicar os objetos como se fossem entidades do banco de dados.
- O lombok traz um controle e uma replicação mais segura para com o banco de dados.
- Interaface traz uma facilidade para conexao com banco de dados

- Serve para ajustar a nomenclatura de um campo para o outro (do front para o back):
    ````java
    @JsonProperty("_id")
    ````

# Estrutura Angular

- para me organizar melhor vou escrever um fluxo de estruturas
    - Extrutura principal
        - Modulo app
        - rota pai
            - Dentro da rota pai, apontamos para o modulo da rota filha
                ````ts
                const routes: Routes = [
                    {path: '', pathMatch: 'full', redirectTo: 'courses'},
                    {path: 'courses',
                        loadChildren: () => import('./courses/courses.module').then(m =>m.CoursesModule)}
                    ];
                ````
            - cursos (negocio - nao faz parte da extrutura do angular)
                - modulo cursos
                - rota cursos
- No angular, por convenção quando a variavel tiver um dolar atras (courses$) ela é um observable
- Mock de dados
    - Array de dados
        ````typeScript
          courses: Course[] = [
            {_id: '1', name: 'Angular', category: 'Front-End'}
        ];
        ````

Aysinc diretamente 
	- disto: <table mat-table [dataSource]="courses" class="mat-elevation-z8">
	- para isto: <div *ngIf="courses$ | async as courses">
	- Agora quem chama os dados em tela é o próprio aysinc do angular. Então se ele tiver mudanças, avalia e traz em tela.

httpclient
    - get, pegar uma informação
    - post, criar
    - put update
    - delete, remoção
    - patch, como se fosse um update
    - request, metodo genérico. 
- ng g m shared/app-material

- lógica com spiner para caso nao ter dados, mostra outro componente
	````ts
		<div *ngIf="courses$ | async as courses; else loading">
			// conteudo
		</div>
		<ng-template #loading>
			<mat-spinner></mat-spinner>
		</ng-template>
	````

- ng g m shared/shared
    - módulo para componentes genéricos
    - colcamos a propridade export dentro do módulo para então deixarmos o compoente genérico, para todos utilizarem.
- Queremos ajustar algum estilo em especifico, colocamos do seguinte maneira no scss do componente:
    ````scss
        .full-width{
        width: 100%;
        }

        mat-card{
        max-width: 80%;
        margin: 2em auto;
        text-align: center;

        }

        .min-width{
        width: 100%;
        min-width: 150px;
        }

    ````
- Caso queiramos para tudo, colcamos dentro do scss global. 
    - style.scss
- Exemplo de inserção no backend
    ````ts
      save(record: Course){
        console.log('record')
        return this.httpClient.post<Course>(this.API, record).pipe(first());
          }
    ````

Utilizamos ountyped form para crioação dos formulários angular vai fazer a inferencia do tS para tipar o formulário.

    ````ts
        import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
          form: UntypedFormGroup
          private formBuilder: UntypedFormBuilder,
    ````

- Readonly serve para setar que estes campos não vao ser alterados, esta é a forma final do campo

- coursesComponent, smart component, vai ter a lógica de serviço com o daialog, e com o roteamento, vamos centrar tudo neste component, para facilitar os testes no futuro.

- input é tudo que está vindo
- output tudo que está saindo.

- Com isto clicamos no onadd, que aponta para a nossa lista e carrega os elementos. 
- Como não temos papel de testar a listagem de cursos em si, facilita o fluxo de testes.
- Criando o nosso módulo, onde ele passa a ter varios componentes.
- Criamos uma nova pasta chamada containers. 
- Colocamos o nosso componente principal para dentro da pasta do container
- Posterior criamos uma pasta chamda components e colocamos os nosso componentes, dentro desta extrutura. 
- Onde fica o formulário?
    - Seria um componente inteligente
    - Seria para a pasta containers


# Estrutura do spring

- Java e maven instalados
- spring initializaitor, para iniciar projeto com as dependencias. 

- Controller
    - Exemplo de Controller
        ````java
            @RestController                                
            @RequestMapping("/api/courses")                
            public class CourseController {                 
                                                           
                @GetMapping                                
                public List<Course> List(){                
                    return null;                           
                }                                          
            }                                              
                                                           
        ````

- Model
    - Exemplo de Model
        ````java
            package com.loiane.model;

            import jakarta.persistence.*;
            import lombok.Data;

            @Data
            @Entity
            public class Course {

                @Id
                @GeneratedValue(strategy = GenerationType.AUTO)
                private Long id;
                @Column(length = 200, nullable = false)
                private String name;
                @Column(length = 200, nullable = false)
                private String category;
            }
        ````
- repository
    - Interface
    - exemplo de Repository
        ````java
            @Repository
            public interface CourseRepository extends JpaRepository<Course, Long> {
            }

        ````
- Service
    - Lógica de Negocio
    - Exemplo de Service
        ````java

        ````    


# VSCode
- Thunder Client
    - Serve para termos um serviço para avalira nossas chamadas
    - Muito simples de utilizar. 
    - Cliente para utilizar apirest com visual studio code. 
- Peacock
    - Instalamos a extensão que muda o projeto de cor
    - utilizamos o comando ctrl+shift+p para mudar a cor

# Atualizações

## Angular:
[Link Aula](https://youtu.be/OBU_K7jq0nM)
- Vamos atualizar a versao do projeto
- É comum atualizarmos o angular, por questões de segurança e novas funcionalidades.
- Primeiramente vemos a versão do angular dentro do package.json
    ````json
        "@angular/cdk": "^16.2.14",
    ````
- Posterior vamos no site do angular, para buscar a atualização
[Angular Update](https://update.angular.io/) 
- Precisamos verificar a versão do node, conforme atualização. 
    - Comando para verificar a versão do node:
    - node -v
    - No meu caso estou usando a versão 18.18
- Temos que verificar a versão to TypeScript
    - tsc -v
    - No meu caso é a 5.2.2, então posso atualizar.
- Rodamos um ng-update para mostrar quais os updates que temos que fazer. 
- Pontos que temos que atualizar na nossa versão:
      Name                               Version                  Command to update
     --------------------------------------------------------------------------------
      @angular/cdk                       16.2.14 -> 17.3.2        ng update @angular/cdk
      @angular/cli                       16.2.13 -> 17.3.2        ng update @angular/cli
      @angular/core                      16.2.12 -> 17.3.2        ng update @angular/core
      @angular/material                  16.2.14 -> 17.3.2        ng update @angular/material

- São ajsutados os apontamentos do package.json
- Após as atualizações rodamos o ng-serve

## Spring


ateteadassad