# Editando um Curso

## 01. API Spring HTTP DELETE
[Link Aula](https://youtu.be/t_fBHydsEHw)
- Vamos preparar o nosso backend para tratar a determinada informação de delete
- Precisamos do identificado para excluir o registro.
- Criamos o seguinte metodo para deletar
    ````java
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> delete(@PathVariable Long id){
            return courseRepository.findById(id)
                    .map(recordFound -> {
                        courseRepository.deleteById(id);
                        return ResponseEntity.noContent().<Void>build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        }
    ````

- Fizemos um teste no delete removendo o o registro de forma física. 
    - http://localhost:8080/api/courses/2
    - Tivemos o retorno de 204 No Content
- Também testamos com um regsitro que não existe na base e tivemos erro. 
- Para inativar um registro, seguimos na linha de criar o @DeleteMapping, porém alterando um campo sttus por exemplo.
     ````java
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> delete(@PathVariable Long id){
            return courseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(course.getName());
                    recordFound.setCategory(course.getCategory());
                    Course updated = courseRepository.save(recordFound);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());
        }
    ````


## Remover Curso
[Link Vídeo](https://youtu.be/sTvmdIC__38)
- Vamos começar ajustando o serviço para exclusão.
- Vamos criar o serviço de delete.
- Utilizando duas tecnologias mas conceitos comuns.
    PUT
    GET
    DELETE
    - Sao os mesmos em ambos os frameworks
- Criamos o delete
    ````ts
          remove(id: string){
            return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
        }
    ````    
- Começar a modificar o nosso componente.
- Criamos o evento de remove do delete
    ````html
        <button mat-icon-button color="warn" aria-label="Adicionar Curso"
        (click)="onDelete(course)">
            <mat-icon>delete</mat-icon>
        </button>
    ````
    ````ts
        @Output() remove = new EventEmitter(false)

        onDelete(course: Course){
        this.remove.emit(course)
        }
    ````
- Estamos passando um objeto inteiro no delete e que escutar ele, faz o que quiser com ele.
- Adicionamos o evento no nosso componente do curso:
    ````html
        <app-courses-list *ngIf="courses$ | async as courses; else loading"
    [courses]="courses"
    (add)="onAdd()"
    (edit)="onEdit($event)"
    (edit)="onRemove($event)"
    ></app-courses-list>
    ````
    ````ts
     onRemove(course: Course){
    this.CoursesService.remove(course._id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso removido com sucesso', 'X' , {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error => this.onError('Erro ao tentar remover este curso')
    );
  }
    ````
- Criamos uma função refresh para atualizar a tela após a remoção do curso. 
    ````ts
      refresh(){
        this.courses$ = this.CoursesService.list()
        .pipe(
        catchError(error => {
            this.onError('erro ao carregar cursos')
            return of([])
        })
        );
    }
    ````
- 


## Dialog de Confirmação
[Link Aula](https://youtu.be/jMuAviiUGPc)
- Vamos começar a adaptar o nosso crud para ficar adaptado para ir para a produção, pois no estado que está hoje não serve para subir para produção.
- Vamos no site do material e vamos pegar uma dialog. 
- Criar uma popup de confirmção onde deixamos por opção dela, deletar ou não o determinado registro. 
- Criamos o componente confirmation-dialog
    - ng g c shared/components/confirmation-dialog
- Como vamos reutilizar o componente, vamos pegar e ajustar dentro do shared module, pq o mesmo está dentro da estrutura shared
- Vamos utilizar o dialogoverviewExapmleDialog
- Ajustamos o construtor do baralho
    ````ts
          constructor(
            public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: string,
        ) {}
    ````
- Ajustamos o clique na confirmação
    ````ts
        onCnfirm(result: boolean): void {
            this.dialogRef.close(result);
        }
    ````
- Agora Vamos montar nosso html
    ````html
        <div mat-dialog-content>
        <p>{{ data }}</p>
        </div>
        <div mat-dialog-actions align="center">
        <button mat-raised-button (click)="onConfirm(true)" color="primary">Sim</button>
        <button mat-raised-button (click)="onConfirm(false)" color="warn">Não</button>
        </div>
    ````
- Podemos analisar que o processofica fluido, utilizando uma função e trazendo so principios de solid.
- Vamos refatorar nosso codigo para utlizar o nosso dialog.`
    - Dentro do courses-list geramos a remoção do componente.    
    ````ts
        onRemove(course: Course){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover este curso?',
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result){
          this.CoursesService.remove(course._id).subscribe(
            () => {
              this.refresh();
              this.snackBar.open('Curso removido com sucesso', 'X' , {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            },
            () => this.onError('Erro ao tentar remover este curso')
          );
        }
      });
  }
    ````
- 