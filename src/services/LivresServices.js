//Appel du fichier de config http = axios + url API REST
import http from "../http-config";

//On creer une classe avec toute les methodes
class LivresServices{
    //Afficher tous les livres
    afficherTousLivres(){
        return http.get("/produits");
    }

    //Afficher un livre
    afficherUnLivre(id){
        return http.get(`/produits/${id}`);
    }

    //Ajouter Un livres
    ajouterLivres(data){
        return http.post("/produits", data);
    }

    //Mettre a jour un livre
    mettreJourLivre(id, data){
        return http.put(`produits/${id}`, data);
    }

    //Supprimer un livre
    supprimerUnLivre(id){
        return http.delete(`/produits/${id}`);
    }

    //Supprimer tous les livres
    supprimerTousLivre(){
        return http.delete("/produits");
    }

    trouverParTitre(nomLivre){
        return http.get(`/produits?nomLivre=${nomLivre}`);
    }
}

//Export de la classe + instance
export default new LivresServices();
