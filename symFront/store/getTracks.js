import axios from 'axios'
import Cookies from 'js-cookie'



export const state = () => ({
    getAllTracks : {
        async view(){
            console.log('View()')
            await axios.get(`http://localhost:4000/api/track`).then((res) => {
                console.log('Axios get')
                this.links = res.data
                this.state = res.data
            })
        }
    }
    
})