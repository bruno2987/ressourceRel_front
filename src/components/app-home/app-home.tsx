import { Component, h,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @Prop() history: RouterHistory;

  async _getData(event){
        this.history.push(`/tags-ressources/${event.target.value}`, {});   // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
}
async _getDataCard(string){
  switch(string){
    case 'senior':
      this.history.push(`/tags-ressources/senior`, {});  // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
    break;
    case 'sante':
      this.history.push(`/tags-ressources/sante`, {});
    break;
    case 'education':
      this.history.push(`/tags-ressources/education`, {});
    break;
    case 'sport':
      this.history.push(`/tags-ressources/sport`, {});
    break;
    case 'association':
      this.history.push(`/tags-ressources/association`, {});
    break;
    case 'emploi':
      this.history.push(`/tags-ressources/emploi`, {});
    break;
  }
}

  render() {
    return (
      <div class='container'>
        <h1 class='text-center'>Accueil</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2 mb-5">
          <div class="col">
            <div id='sante' class="card h-100 border-primary  " onClick={() => this._getDataCard('sante')}>
              <img src="/svg/sante.png" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Santé</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='education' class="card h-100 border-primary  " onClick={() => this._getDataCard('education')}>
              <img src="/svg/education.jpg" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Éducation</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='sport' class="card h-100 border-primary  " onClick={() => this._getDataCard('sport')}>
              <img src="/svg/sport.png" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Sport</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='association' class="card h-100 border-primary  " onClick={() => this._getDataCard('association')}>
              <img src="/svg/association.png" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Association</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='emploi' class="card h-100 border-primary  " onClick={() => this._getDataCard('emploi')}>
              <img src="/svg/emploi.png" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Emploi</h3>
              </div>
            </div>
          </div>
          <div class="col">
            <div id='senior' class="card h-100 border-primary  " onClick={() => this._getDataCard('senior')}>
              <img src="/svg/senior.png" class="card-img-top h-75" alt="..."/>
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Sénior</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
