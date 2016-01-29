window.onload  = function(){
    var

        test= 0,
        snake = [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2} ],
        MAXSNAKE = 100,RIGHT = 39,LEFT = 37,UP = 38, DOWN = 40,
        SNAKECOLOR='#8EC63F',FOODCOLOR='#ff4520',DEFAULTCOLOR = 'white',
        ROW = 10,
        defaultDirection = RIGHT,

        isInSnake = function(x,y){
            for ( var i = 0;  i < snake.length;  i++){
                if(  snake[i].x == x && snake[i].y == y){return true;}
            }
            return false;
        },
        random = function(){
            return Math.floor( Math.random()*ROW );
        },
        $ = function(id){
            return document.getElementById(id);
        },
        join =function(f,s){
            return f + '-' + s;
        },
        dropFood  = function(){
            var
                x = random(), y = random();
            if( snake.length == MAXSNAKE ){return null;}
            while( isInSnake(x,y) ){
                x = random();
                y = random();
            }
            $( join(x,y) ).style.background = 'url(./images/food.png)';
            $( join(x,y) ).style.backgroundSize='cover';
            return {x:x,y:y};
        },
        food = dropFood(),
        pp=false,
        zou = function(){
            if(pp)return;
            var last  = snake.length -1,newHead,weiba;
            if( defaultDirection== RIGHT ){newHead = {x:snake[last].x, y:snake[last].y+1};}
            if( defaultDirection== LEFT  ){newHead = {x:snake[last].x, y:snake[last].y-1};}
            if( defaultDirection== DOWN  ){newHead = {x:snake[last].x+1, y:snake[last].y};}
            if( defaultDirection== UP    ){newHead = {x:snake[last].x-1, y:snake[last].y};}
            if( newHead.x >9 || newHead.x <0 || newHead.y>9 || newHead.y <0){
                $('tishi2').style.display = 'block';
                clearInterval(zouqilai);
                return null;
            }
            if( isInSnake(newHead.x,newHead.y) ){
                $('tishi1').style.display = 'block';
                clearInterval(zouqilai);
                return null;
            }
            snake.push(newHead);
            if(newHead.x == food.x && newHead.y == food.y){
                $( join( food.x,food.y) ).style.background = SNAKECOLOR;
                test += 5;
                $('shu').innerHTML=test;
                food = dropFood(); return null;
            }
            weiba = snake.shift();
            $( join( weiba.x , weiba.y) ) .style.background  = DEFAULTCOLOR;
            $( join( newHead.x , newHead.y) ).style.background = SNAKECOLOR;
            return null;
        };
    //-----------------------------------------------------------------
    (function(){
        for ( var i = 0;  i < snake.length;  i++){
            $(join(snake[i].x,snake[i].y)).style.background = SNAKECOLOR;
        }
    })();
    document.onkeydown = function(e){
        var dds = e.keyCode;
        if( ( defaultDirection==LEFT ||
            defaultDirection==UP   ||
            defaultDirection==RIGHT||
            defaultDirection==DOWN
            ) &&
            Math.abs( dds - defaultDirection) !== 2 ){
            defaultDirection =dds;
        }
    };


//---------------------------------------------------

    shu.innerHTML=test;
    var start = document.getElementById('start');
    var zanting = document.getElementById('zanting');
    var jiandan = document.getElementById('jiandan');
    var nan = document.getElementById('nan');
    var anniu = document.getElementsByClassName('btn');
    var index =500,kaiguan=false;
    var zouqilai =setInterval(zou,index);
    clearInterval(zouqilai);

    start.onclick = function(){
        kaiguan = true;
        zouqilai =setInterval(zou,index);
    }
    zanting.onclick = function(){
        if(kaiguan){
            clearInterval(zouqilai);
        }
    };

    jiandan.onclick = function(){
        if(kaiguan){
            zouqilai =setInterval(zou,index);
        }

    }
    nan.onclick = function(){
        if(kaiguan){
            clearInterval(zouqilai);
            zouqilai =setInterval(zou,200);
        }

    };
    for(var i=0;i<anniu.length;i++){
        anniu[i].onclick = function(){
            location.reload();
        }
    }










};
