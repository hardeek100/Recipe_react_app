import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import "./App.css"
const App = () =>{
        const AppID = ""
        const AppKey = "" 
        
        const [recipes, setRecipes] = useState([]);
        const [search, setSearch] = useState('search here');
        const [query, setQuery] = useState('potato')

        useEffect(()=>{
           getRecipes(); 
        }, [query]);
        
        const getRecipes = async () => {
            const data = await (await fetch(`https://api.edamam.com/search?q=${query}&app_id=${AppID}&app_key=${AppKey}`)).json();
            console.log(data.hits);
            setRecipes(data.hits);
          }
        const getSearch = e => {
            e.preventDefault();
            setQuery(search);
            setSearch('');
        }
        return(
            <div className = "App">
                <form onSubmit = {getSearch} className = "search-form">
                    <input className = "search-bar" type="text" value={search} onClick = {()=>setSearch('')}
                    onChange = {(e) => {setSearch(e.target.value)}}/>
                    <button className = "search-button" type="submit">Search</button>
                </form>
                <div className="recipes">
                    {recipes.map(recipe => (
                    <Recipe 
                     key ={recipe.recipe.label}
                     title={recipe.recipe.label}
                     calories={recipe.recipe.calories} 
                     ingredients={recipe.recipe.ingredients}
                     image={recipe.recipe.image}/>
                ))}

                </div>
                
            </div>
        )
    
}

export default App;
