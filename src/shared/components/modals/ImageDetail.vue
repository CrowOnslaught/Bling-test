<template>
    <div id="content">
        <div id="imageContainer">
            <img :src="photo.urls.full" :alt="photo.alt_description">
            <div id="footer">
                <h1>{{photo.alt_description}}</h1>
                <h1 v-if="!photo.alt_description">Untitled</h1>
                <h2>by {{photo.user.name}}</h2>  
                <div id="buttons">
                    <input type="text" placeholder="example@mail.com" v-model="mailInput">
                    <button :disabled="!$v.mailInput.email || !$v.mailInput.required || disabledSend" @click="sendToMail()">Send</button>
                    <button @click="close('')">Close</button>
                </div>  
            </div>
        </div>
      </div>
</template>


<script>
import axios from 'axios';
import Global from "../../services/global";

import { required, email, minLength } from 'vuelidate/lib/validators';


export default {
    name:'ImageDetail',
    props:[ 'photo'],
    data()
    {
        return{
            mailInput:'',
            disabledSend:false,
            photoToken:{
                url: '',
                desc: '',
                user: ''
            }
        }
    },
    validations:
    {
        mailInput:{required, minLength: minLength(5), email},
    },
    mounted()
    {
        console.log('TESTING SERVER');
        axios.get(Global.url + 'info')
            .then(res =>
            {
                if(res.data)
                {
                    console.log(res.data);
                }
            })
            // .catch(err => console.log('nnnnnnnnnn',err));
            .catch(err => 
            {
                window.alert('NODE SERVER DOWN\nRun the node server for an optimal test');
                console.log(err);
            });

    },
    methods:
    {
        close(value)
        {
            this.$emit('closeModal', value);

        },
        sendToMail()
        {
            this.disabledSend = true;

            this.photoToken = 
            { 
                url: this.photo.urls.full,
                desc: this.photo.alt_description,
                user: this.photo.user.name,
                to: this.mailInput,
            }

            axios.post(Global.url + 'sendMail', this.photoToken)
                .then(res =>
                {
                    if(res.data)
                    {
                        if(res.data.status == 'sucess')
                        {
                            window.alert(res.data.message);
                            this.close(this.mailInput);
                        }
                        else if(res.data.status == 'error')
                        {
                            window.alert(res.data.message);
                            this.disabledSend = false;
                        }
                    }
                });
        }
    }
}
</script>

<style scoped>
#content
{
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background: rgba(128, 128, 128, 0.541) !important;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img
{
    margin-top: -50px;
    max-width: 60vw;
    height: 70vh;
}

#footer{
    
    color: white;

    text-align: center;

    background-color: #0b5e20b2;
    padding: 10px 50px 10px 50px;
    border-radius: 20px;

}
h1,h2
{
    text-align: center;
    padding: 0 50px;
}

#buttons
{
    margin: auto;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

      margin-bottom: 20px;

}

button{
  background: rgb(23, 150, 19);
  color: white;
  border-radius: 12px;
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  transition: 300ms all;
  border: none;
  height: 38px;
  cursor:pointer;

  width: 20%;
}

button:last-of-type
{
    background: red;
}

button:disabled
{
  background: rgb(10, 61, 8);
  color: gray;
}

input[type="text"]{
    width: 50%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 3px;
    transition: 300ms all;
    margin: 0;
}

input[type="text"]:focus{
    box-shadow: 0px 0px 5px #eee inset;
}

@media (max-width: 1600px)
{

    img
    {
        max-width: 80vw;
        max-height: 80vh;
    }

    #footer
    {
        padding: 5px 0px;
    }

    h1
    {
        padding: 0 10px;
        font-size: 18px;
    }
    h2
    {
        padding: 0 10px;
        font-size: 14px;
    }
}

</style>