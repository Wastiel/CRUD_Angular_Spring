# Lista de Cursos: Backend com Spring

## 01. Ambiente Java + Maven para Spring
- [Linke da Aula](https://youtu.be/Ge7Em4byou8)
- Vamos instalar o java e ajustar a variavel home.
- Variavel de ambiente maven ou gradle vao procurar onde esta o java
- Variaveis de ambiente
    - Conseguimos validar o java que está configurado dentro do terminal
    java -version
    javac -version
- Posterior baixamos o maven
    [maven](https://maven.apache.org/download.cgi)
    - Descompactar e colocar em qualquer lugar.
    - ver a versão do maven
    - mvn -version
## 02. Hello World com Spring
- Criamos o nosso projeto via VSCode.
- Eu criei via spring initializr
    [START SPRING](https://start.spring.io/)
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
        Spring Boot Dev Tools
- Tive que ajustar as dependencias do meu arquivo do maven
    - C:\Users\willian.silva\.m2\settings.xml
    - Dentro coloquei o repositorio do maven, pois hoje so tinha o da empres que eu trabalho.
    ````xml
      <mirrors>
        <mirror>
        <id>sicredi-mirror</id>
        <mirrorOf>*</mirrorOf>
        <name>Sicredi Internal Repository</name>
        <url>http://maven.sicredi.net/artifactory/repo</url>
        <url>http://repo1.maven.org/maven2/</url>
        </mirror>
    </mirrors>
    <mirrors>
    ````
- Colocamos oprojeto no intelijei e e com isto o maven conseguiu baixar as dependencias sem erros
- Criamos uma classe para teste
    ````java
        @RestController
        @RequestMapping("/api/hello")
        public class helloController {

            @GetMapping
            public @ResponseBody String hello(){
                return "hello!";
            }
        }

    ````
- Com isto conseguimos acessar uma API no nosso navegador.
- localhost:8080/api/hello
- Configurei o intelijei para executar alterações de forma automatica.
    Para habilitar a compilação automática no IntelliJ IDEA, siga estas etapas:
    Vá para File > Settings no IntelliJ IDEA.
    No painel esquerdo, selecione Build, Execution, Deployment.
    Selecione Compiler.
    Marque a opção Build project automatically.
- O Comando @RestController serve para para publicar o metodo no formato de API
- O comando @RequestMapping("/api/hello")   
    - Caminho da API


## 03. Listar Cursos (API HTTP GET)
- Vamos criar a nossa controller para listar os nossos cursos. 
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
    - @GeneratedValue(strategy = GenerationType.AUTO)
        - Dizemos que o ID vai gerar automaticamente
    - @Column(name = "nome")
        - Direcionamos par auma coluna do banco de dados especifica
    - @Column(length = 200, nullable = false)
- Com o lombok conseguimos replicar os objetos como se fossem entidades do banco de dados.
- O lombok traz um controle e uma replicação mais segura para com o banco de dados.
- Interaface traz uma facilidade para conexao com banco de dados
    ````java
        @Repository
    public interface CourseRepository extends JpaRepository<Course, Long> {
    }

    ```` 
    - O Spring cria uma relação para funçãoes de rotorn de chamadas, como 
    - Gera chamadas ao banco pré definidas
- Criamos a contorller:
    ````java
        @RestController
        @RequestMapping("/api/courses")
        @AllArgsConstructor
        public class CourseController {

            private CourseRepository courseRepository;

            @GetMapping
            public List<Course> List(){
                return courseRepository.findAll();
            }
        }

    ````
- Criamos a model:
    ````java
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
- Criamos a interface 
    ````java

        @Repository
        public interface CourseRepository extends JpaRepository<Course, Long> {
        }

    ````
- Vamos criar uma simulação de dados, mas não vai ser o padrão que vamos utilizar
    - Criamos um Bean para realizar o processo:
    ````java
            @Bean
    CommandLineRunner initDatabase(CourseRepository courseRepository){
        return args ->{

            courseRepository.deleteAll();
            Course c = new Course();
            c.setName("Angular com Spring");
            c.setCategory("Front-End");

            courseRepository.save(c);
        };
    ````
- 
- Programação orientada a notação

## 04. Banco de Dados H2 e Conectando o Angular na API Spring
[Video Aula](https://youtu.be/ATjHgBh8dWg)
- Vamos entender o H2, Banco de dados.
- Vamos elencar a nossa Api ligando no angular.
- H2
    - banco de dados em Memoria. 
    - Mais para frente vamos remover este banco de dados e coloca rum banco de dados real
    - O spring espera informações no aplication.propreties, quando utilizamos H2
    - Padronizado as propriedades do aplication.propriets
    `````md
        spring.application.name=crud-spring
        spring.datasource.url=jdbc:h2:mem:testdb
        spring.datasource.driverClassName=org.h2.Driver
        spring.datasource.username=sa
        spring.datasource.password=password
        spring.jpa.database-plataform=org.hibernate.dialect.H2Dialect
        spring.jpa.show-sql=true
    `````
    -  Com as propriedades acima, conseguimos, analisar melhor as ações realizads no banco de dados. 
    - spring.jpa.show-sql=true
        - Esta opção somente serve somente para debug, não deve subir true para produção e sim false, para não expor selects.
    - Para acessarmos o console do H2:
        - http://localhost:8080/h2-console/
        - So funciona em tempo de execução
        - Colocamos os dados configurados no propriets
- Instalamos uma extensão do VScode, para verificar requestes de APIREST
    - Thunder Clien
- Agora vamos linkar a nossa API no nosso frontend. 
    - Instalamos a extensão do Peacock
- Iniciamos o nosso projeto Angular, e vamos linkar nossa api
- Temos um erro ao atualizar a nossa Api (http://localhost:8080/api/courses), ocorre um erro de CORS
- Vamos utilizar um proxy para burlar o cros. Mais para frente vamos ajusta melhor a determinada aplicação.
- Configurando o proxy
    - Criamos um arquivo proxy.conf.js na raiz do projeto.
    ````js
        const PROXY_CONFIG = [
          {
            context: ['/api'],
            target: 'http://localhost:8080/',
            secure: false,
            logLevel: 'debug'
          }
        ];

        module.exports = PROXY_CONFIG;
    ````
    - Toda a vez que utilizarmos /api, vamos apontar para o localhost:8080
    - Configuramos o package.json
        ````json
            "start": "ng serve --proxy-config proxy.conf.js",
            "build": "ng build",
            "watch": "ng build --watch --configuration development",
            "test": "ng test"
        ````
    - Atualizamos os apontamentos da API
    - Inicializamos o projeto com npm start
- Temos o id do spring diferente do id do front e isto pode acontecer em aplicações legado.
    - Para ajustarmos isto, utilizamos a seguinte notação no nosso objeto no back:
        - @JsonProperty("_id")
