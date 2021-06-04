<!DOCTYPE html>
<html>
    <head>

        <!--Import bootstrap to show shadowroot working-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        
        <!--Import angular builded elements-->
        <script src="angular-components/dist/angular-components/runtime-es2015.js" type="module"></script>
        <script src="angular-components/dist/angular-components/runtime-es5.js" nomodule defer></script>
        <script src="angular-components/dist/angular-components/polyfills-es5.js" nomodule defer></script>
        <script src="angular-components/dist/angular-components/polyfills-es2015.js" type="module"></script>
        <script src="angular-components/dist/angular-components/main-es2015.js" type="module"></script>
        <script src="angular-components/dist/angular-components/main-es5.js" nomodule defer></script>

        <!--Import react builded elements-->
        <script src="react-webpack-component/dist/main.js" type="module"></script>
    </head>

    <body>

        <style>
            body{
                margin: 1rem;
            }
            body > p{
                max-width: 80%;
            }
            .frameworks{
                display: flex;
                flex-wrap: wrap;
            }
            .frameworks > div{
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                max-width: 50%;
                margin: 1rem 0;
            }
            .frameworks > div > h2,.frameworks > div > p{
                margin: 0px 1rem;
            }
        </style>
    
        <h1 class="text-4xl leading-7 font-bold text-purple-600">
            Frameworks element to WebComponent 
        </h1>
        <p>Working on html <?php echo "and php"?></p>
        <p>Each element of each framework is studied to shadow css implementation (using shadowdom e slot), for all content, except for slotted/injected content.</p>

        <div class="frameworks">
            <div>
                <h2>Angular components</h2>
                <p>with shadowed tailwindcss</p>
                <ngx-app-card id="ngxcard" name="Attributo injectato in angular da php" disabled="true">
                    <h1 class="text-4xl leading-7 font-bold text-purple-600">Titolo php Injected in angular</h1>
                    <button class="btn btn-primary bg-purple-500">Bottone php injected in angular</button>
                </ngx-app-card>
    
                <script>
                    document.getElementById("ngxcard").addEventListener("carded",(val)=>{console.log("ngx carded "+val.detail)})
                </script>
            </div>
    
            <div>
                <h2>React components</h2>
                <react-app-card id="reactcard" name="Attributo injectato in react da php" disabled="true">
                    <h1 class="text-4xl leading-7 font-bold text-purple-600">Titolo php Injected in react</h1>
                    <button class="btn btn-primary bg-purple-500">Bottone php injected in react</button>
                </react-app-card>
    
                <script>
                    document.getElementById("reactcard").addEventListener("carded",(val)=>{console.log("react carded "+val.detail)})
                </script>
            </div>
            
            <div>
                <h2>Angular routing example</h2>
                <app-main></app-main>
            </div>
        </div>

        
    </body>
</html>