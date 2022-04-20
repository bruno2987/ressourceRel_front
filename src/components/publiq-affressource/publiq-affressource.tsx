import { Component, h, State,Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Ressources } from '../../utils/Ressources';
import {PATH} from '../../utils/path.js';

@Component({
    tag:'publiq-affressource',
    styleUrl: 'publiq-affressource.css',
    shadow: false,
})

export class affressource {
    @Prop() match:any;
    @State() afficherRessources:Ressources;
    @Prop() history: RouterHistory;
    @State() commenttext:string;
    @State() message: string;
    @Prop() connected: boolean = false;

    async componentWillLoad() {
        this._getData();
        this.checkConnexion();
    }

    async vueplus1(){
        try{
            let response = await fetch(PATH.back+'/public/statressource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: this.match.params.id
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async signalerRessource(idRessource){
        try{
            let response = await fetch(PATH.back+'/users/signalerUneRessource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: idRessource
                }),
            })
            console.log(response)
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }
    
    async signalerCommentaires(commentaireid){
        console.log(commentaireid)
        try{
            let response = await fetch(PATH.back+'/users/signalerUnCommentaire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    commentaireid: commentaireid
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async favorisRessource(idRessource){
        try{
            let response = await fetch(PATH.back+'/users/favorisRessource/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    ressourceid: idRessource
                }),
            });
            document.getElementById('coeurVide').setAttribute('hidden','true')
            document.getElementById('coeurPlein').removeAttribute("hidden")
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async suivreUtilisateur(idUser){
        try{
            let response = await fetch(PATH.back+'/users/suivreUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    utilisateursSuivis: idUser
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async addComment(e){
        e.preventDefault()
        try{
            let response = await fetch(PATH.back+'/users/commente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                    userid: localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    _id: this.match.params.id,
                    commentaireText: this.commenttext
                }),
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            console.log(this.message)
            window.location.reload()
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async _getData(){
        try{
            let response = await fetch(PATH.back+'/public/afficheRessource/' + this.match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.status == 401) {this.message = (await response.json()).message}
            this.afficherRessources = await response.json();
        }
        catch (err){
            console.log('fetch failed', err);
        }
    }

    async alldata(event){
        this.commenttext=(event.target.value)
    }

    async gotoprofile(idUser){
        this.history.push(`/profilSuivi/${idUser}`, {}); 
    }
   
    async checkConnexion(){
        let response = await fetch(PATH.back+'/users/testAuth',{
            method:'POST',
            headers: {
                authorization: localStorage.getItem('token'),
                userid: localStorage.getItem('userId')
            }
        });
        if(response.status == 201){
            this.connected = true
        }
    }
    // async downloadPDF(pdf){
    //     DownloadFile(`http://localhost:3000/file/${pdf}`, {}); 
    // }
    

    render(){
        if(this.afficherRessources){
            const nbrVue=this.afficherRessources.stats.vuesConnecte + this.afficherRessources.stats.vuesnonConnecte
            return (
                <div>
                    <div class="container pb-3">
                        <hive-pdf-viewer class="mx-auto pdf-frame " src={PATH.back+'/file/'+this.afficherRessources.fileName}></hive-pdf-viewer>
                    </div>

                    <div class="container bottom-page-ressource pb-2">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="bloc-commentaire pb-2 mb-3">
                                    <div class="d-flex justify-content-center pt-3 mx-3">
                                        <p class="titre">{this.afficherRessources.titre}</p>
                                    </div>
                                    <div class="d-flex justify-content-end align-items-start nom-user me-2">
                                        <div><p>de {this.afficherRessources.prenomNomUser}</p></div>
                                        <div class="nostyle mx-1" onClick={() => this.gotoprofile(this.afficherRessources.idUser)}><img class="icone" src="/bootstrap-files/person-fill.svg" width="25" height="25"></img></div>
                                        <div class="text-primary h4 suivreUser" onClick={()=>this.suivreUtilisateur(this.afficherRessources.idUser)}>＋</div>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <div id='coeurVide' class="nostyle mx-2" onClick={()=>this.favorisRessource(this.afficherRessources._id)}><img class="icone" src="/bootstrap-files/heart.svg" width="35" height="35" ></img></div>
                                        <div id='coeurPlein' hidden class="nostyle mx-2"><img class="icone" src="/bootstrap-files/heart-fill.svg" width="35" height="35"></img></div>
                                        <div class="nostyle mx-2" ><a href={PATH.back+'/file/'+this.afficherRessources.fileName} target="_blank"><img class="icone" src="/bootstrap-files/download.svg" width="35" height="35"></img></a></div>
                                        <div class="h3 signalerRess" onClick={()=>this.signalerRessource(this.afficherRessources._id)}><img class="icone ms-2 me-3" src="/bootstrap-files/exclamation-triangle.svg" width="35" height="35"></img></div>
                                    </div>
                                    <div class="d-flex justify-content-end mb-1">
                                        <div class="h4 text-muted">{nbrVue}<img class="icone ms-2 me-3" src="/bootstrap-files/eye.svg" width="35" height="35"></img></div>

                                    </div>


                                    <div class="d-flex justify-content-center text-center description mx-2">
                                        <i>{this.afficherRessources.resume}</i>
                                    </div>
                                </div>

                                {/* <div>
                                    Date de publication: {this.afficherRessources.datePublication} <br />
                                    Titre: {this.afficherRessources.titre} <br />
                                    Nombre vues: {nbrVue} <br />
                                    Type: {this.afficherRessources.type} <br />
                                    Tags: {this.afficherRessources.tags} <br />
                                    Auteur: {this.afficherRessources.prenomNomUser} <br />
                                    vers profil utilisateur : <button value={this.afficherRessources.idUser}  onClick={(event) => this.gotoprofile(event)}>profil de l'utilisateur</button> <br />
                                    Resumé: {this.afficherRessources.resume} <br />
                                    Favoris ressource: <button value={this.afficherRessources._id} onClick={idRessource=>this.favorisRessource(idRessource)}>ressourcefavoris</button> <br />
                                    Supprimer favoris ressource: <button value={this.afficherRessources._id} onClick={idRessource=>this.supprimerFavorisRessource(idRessource)}>suprimer ressourcefavoris</button> <br />
                                    Suivre utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.suivreUtilisateur(idUser)}>suivre utilisateur</button> <br />
                                    Supprimer suivi utilisateur : <button value={this.afficherRessources.idUser} onClick={idUser=>this.supprimerSuivreUtilisateur(idUser)}>supprimer suivi utilisateur</button> <br />
                                    Signaler ressource : <button value={this.afficherRessources._id} onClick={idRessource=>this.signalerRessource(idRessource)}>signalerRessource</button> <br />

                                    <form onSubmit={(e)=>this.addComment(e)}>
                                            <label>ajouterCommentaire
                                                <input type="text" name='commenttext' onInput={(event) => this.alldata(event)}/>
                                            </label>
                                            <input type='submit' value='submit'> </input> <br />
                                    </form>

                                </div> */}


                            </div>
                            <div class="col-sm-6">
                            {this.connected?
                                    <div class="p-1 mb-2 envoi-commentaire">
                                        <form  onSubmit={(e)=>this.addComment(e)}>
                                            <div class="row mx-1">
                                                <textarea class="form-control ombrage"  placeholder ="Votre commentaire" name="commenttext" id="" onInput={(event) => this.alldata(event)}></textarea>
                                                <input class="btn btn-primary text-white mt-2 bouton-commentaire ombrage" type='submit' value='Envoyer' > </input> <br/>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    null
                                }
                                {this.afficherRessources.commentaires.map((d,idx)=>{
                                return  (
                                <div class="pb-2 commentaire" key={idx}>
                                    <div class="bloc-commentaire py-1 px-2"> <span class="text1">{d.commentaireText}</span>
                                        <div class="d-flex justify-content-between align-items-center pt-2">
                                            <div class="d-flex">
                                                <div><i class="text2">{d.prenomNomUser} </i></div>
                                                <div><i class="date ">, le {d.datePublicationComment.substr(0, 10)}</i></div>
                                            </div>
                                            
                                            <button class="nostyle align-middle" onClick={() => this.signalerCommentaires(d._id)}><img class="icone" src="/bootstrap-files/exclamation-diamond.svg" width="18" height="18"></img></button>
                                        </div>
                                    </div>
                                </div>
                                )})}
                            </div>
                        </div>
                    </div>
                    <style>.hidden{this.vueplus1()}</style> 
                </div>
            )
        }
        if(this.message){
            return (
                <div>
                    <p>{this.message}</p>
                </div>
            )
        }
    }
}
