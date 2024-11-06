import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { language, notifications, userItems } from './header-dummy-data';
import { Router } from '@angular/router';
import { ProfileModalComponent } from '../../profile-modal/profile-modal.component'; // Ajusta la ruta según tu estructura de carpetas
import { CONSTANTES } from 'src/app/constants/INVETARIOJS.constants';
import { LoginService } from 'src/app/services/negocio/Login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalService } from '../../services/negocio/autenticacion/local.service';

declare var $: any; // Para usar jQuery

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(ProfileModalComponent) profileModal!: ProfileModalComponent; // Usamos ViewChild

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  canShowSearchAsOverly = false;
  selectedLanguage: any;
  languages = language;
  notifications = notifications;
  userItems = userItems;
  constructor(
    private router: Router,
    public loginService: LoginService,
    private spinner: NgxSpinnerService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }
  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }
  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverly = true;
    } else {
      this.canShowSearchAsOverly = false;
    }
  }
  cerrarSesion(item: { icon: string; label: string }) {
    if (item.label === 'Profile') {
      this.profileModal.openModal();
      console.log('object');
    } else if (item.label === 'Salir') {
      this.loginService.cerrarSesion('').subscribe({
        next: (resp: any) => {
          if (
            resp[CONSTANTES.CODIGO_RESPUESTA] &&
            resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
          ) {
           
            this.router.navigate(['login']);

          } else if (
            resp[CONSTANTES.CODIGO_RESPUESTA] &&
            (resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.CORREO_EXISTE ||
              resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.DOCUMENTO_EXISTE)
          ) {
          }
        },
        error: (err: any) => {
          console.error('err', err);
        },

        complete: () => {
          this.spinner.hide();
        },
      });

    } else {
      console.log(`Clicked on: ${item.label}`);
    }
  }

  openProfileModal() {
    $('#profileModal').modal('show'); // Abre el modal de Bootstrap
  }
}
