export class Paths{
 origin:string='http://localhost:4500/authorize'
 endPoints:{}={
        isValid:this.origin+'/isvalid',
        getRole:this.origin+'/role'
    }

}