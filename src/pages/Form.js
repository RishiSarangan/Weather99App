import React, { useEffect, useState}  from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';


export default function Form(){

    //form intialisation 
    const{
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    const [data, setData] = React.useState({
        list:[{
            main: {},
            weather:[{}]
        }],
        city:{
            coord:{

            }
        }
    });
    function onSubmit(value){
            let get_url = 'https://api.openweathermap.org/data/2.5/forecast?q='+ value.city +'&units=metric&appid=2157d5b0d0a29000bcc3604038142c23';
            axios.get(get_url)
            .then((res) => {
                setData(res.data); 
            });
            reset();
        };
    

    //to convert unistd timestamp to date
    function dateConvert(timestamp){
        let date = new Date(timestamp * 1000).toLocaleDateString("en-IN");
        return date;
    }

    function imageConvert(icon){
        let imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        return imageurl;
    }

    // final return function
    return(
        <div className='box'>
            <div className='titlebox'>
                <ShareLocationIcon />
                <h2>{data.city.name}</h2>
                <p>{data.city.coord.lat} & {data.city.coord.lon}</p>
            </div>
            <div className='formbox'>
                    <form onSubmit={handleSubmit(onSubmit)} class = "registerform">
                        <div class="input-group">
                                <input 
                                type="text" 
                                name="city" 
                                id = "inputbox"
                                autoComplete='off'
                                class="form-control"
                                placeholder='Search your city here'
                                {...register("city", {
                                    required: true
                                })} />
                                <div class="input-group-btn">
                                    <Button variant="dark" id="button-addon2" type="submit">
                                    <SearchIcon />
                                    </Button>
                                </div>
                        </div>
                    </form>
            </div>
            <div class="row" id='rowbox' >
                <div class="col-sm-2">
                    <Button variant="dark" id="button" type="submit">
                        Choose Date
                    </Button>
                    <div id = "titles">
                        <p>High Temperature</p>
                        <p>Low Temperature</p>
                        <p>Humidity</p>
                        <p>Sunrise Time</p>
                        <p>Sunset Time</p>
                    </div>
                </div>
                {data.list.map((dat,i) => (
                    i % 8 === 0? 
                    <div class="col-sm-2">
                        <p className='datebox'>{dateConvert(dat.dt)}</p> 
                        <div id="cards" class="card text-bg-dark" key = {i}>
                            <div class="card-header border-2">
                                <img class="card-img-top" id='weatherimage' src = {imageConvert(dat.weather[0].icon)}  alt="Card image cap" ></img>
                                <p class="card-text">{dat.weather[0].main}</p>
                            </div><br></br>
                            <p class="card-text">{dat.main.temp_max} C</p>
                            <p class="card-text">{dat.main.temp_min} C</p>
                            <p class="card-text">{dat.main.humidity}%</p>
                            <p class="card-text">{new Date(data.city.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                            <p class="card-text">{new Date(data.city.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                        </div>
                    </div>
                    :undefined
                ))}
            </div>
        </div>
    );
}