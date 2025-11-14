import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"Ziad",title:"ZiadCollection",pathMatch:"full"},
    {path:"Ziad",loadComponent:()=>import("../app/pages/davies-portfolio-component/davies-portfolio-component").then(c=>c.DaviesPortfolioComponent),title:"ZiadCollection"},
    {path:"FirstProfile",loadComponent:()=>import("../app/pages/profilepage1/profilepage1").then(c=>c.ProfilePage1),title:"Davies"},

];
