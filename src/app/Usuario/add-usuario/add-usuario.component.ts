import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Rol } from 'src/app/Modelo/Rol';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  @ViewChild("myModalRol", { static: false }) myModalRol: TemplateRef<any>;

  rolSelect = new Set<Rol>();

  usuario :Usuario=new Usuario();
  rol: Rol = new Rol();

  roles: Rol[];
  dataSourceRol = new MatTableDataSource<Rol>();
  displayedColumnsRol: string[] = ['codigo', 'nombre'];

  codigoUsuario: number;
  banderaEditUser: String;
  messageResponse: String;
  titulo: String;

  constructor(private router:Router, private service:ServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.saveOrEditUsuario();
    
  }

  saveOrEditUsuario(): void {
    let val1 = localStorage.getItem('actualizarUsuario');
    this.banderaEditUser = String(val1);
    console.log("varr 222: " + this.banderaEditUser);
    if (this.banderaEditUser == "true") {
      this.titulo = "ACTUALIZAR USUARIO";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarUsuario();
    } else {
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }

  }

  guardarUsuario(){
    this.usuario.rol = this.rol;
    this.service.createUsuario(this.usuario)
    .subscribe(data=>{
      console.log(data)
      alert(this.messageResponse);
      this.router.navigate(["list-usuario"])        
    })
  }

  editarUsuario(): void {
    let codigo = localStorage.getItem('codigoUsuario');
    console.log("codigoUsuario " + codigo);
    this.codigoUsuario = Number(codigo);
    this.service.getUsuarioPorCodigo(this.codigoUsuario)
      .subscribe(data => {
        this.usuario = data;
        this.rol.nombre = data.rol.nombre;
      })
  }

  cancelar(): void {
    this.router.navigate(["list-usuario"]);
  }

  openDialogRol() {
    this.rolSelect = new Set<Rol>();
    const dialogRef = this.dialog.open(this.myModalRol, { width: '60%', panelClass: 'icon-outside', });
    this.getAllRoles();

    dialogRef.afterClosed().subscribe(result => {

      for (let roll of this.rolSelect) {
        this.rol = roll;
      }

    });
  }

  getAllRoles = () => {
    this.service.getRoles()
      .subscribe(data => {
       this.roles= data;
        this.dataSourceRol.data = this.roles;
       // console.log('res', data);
      })
  }
  
  selectRolDialog(row: any) {
    this.rolSelect.clear();
    this.rolSelect.add(row)
    //this.dialog.close;
  }
}
