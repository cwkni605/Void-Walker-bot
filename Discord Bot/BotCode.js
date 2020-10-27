const Discord = require('discord.js');
const client = new Discord.Client();
const Prefix = "^";
const giphyToken = "0qBmZTC1mkFebUeM5IejAG5orFpm1pAp";
var GiphyAPIClient = require('giphy-js-sdk-core')
giphy  = GiphyAPIClient(giphyToken)


class World
{
    constructor(id,tag,calledTime)
    {
        this.userId = id;
        this.userTag = tag;
        this.previousTime = calledTime;
        this.lastAdded = calledTime;
        this.dificulty = 0;
        this.worldTime = 1;
        this.celest = "day";
        this.enitityList = [new Man()];
        this.worldData =
        [[[new Tile("dirt",0,"tree"),new Tile("dirt",0,"none"),new Tile("dirt",0,"none")],
        [new Tile("dirt",0,"none"),new Tile("hole",0,"man",this.enitityList[0]),new Tile("fluid",0,"none")],
        [new Tile("dirt",0,"none"),new Tile("dirt",0,"none"),new Tile("dirt",0,"tree")]],

        [[new Tile("stone",1,"none"),new Tile("stone",1,"none"),new Tile("stone",1,"ore")],
        [new Tile("stone",1,"none"),new Tile("hole",1,"none"),new Tile("fluid",1,"none")],
        [new Tile("stone",1,"none"),new Tile("stone",1,"none"),new Tile("stone",1,"ore")]]];
    }
    move(World, Mob, Layer, Row, Tile)
    {
        console.log(Mob.direction);
        try
        {
            if (Mob.direction == 0)
            {
                if (World[Layer][Row-1][Tile].crossable)
                {
                    World[Layer][Row-1][Tile].structure = Mob.name;
                    World[Layer][Row-1][Tile].crossable = false;
                    World[Layer][Row-1][Tile].mob = Mob;
                    World[Layer][Row][Tile].structure = "none";
                    World[Layer][Row][Tile].crossable = true;
                    World[Layer][Row][Tile].mob = "none";
                }
            }
            if (Mob.direction == 1)
            {
                console.log(1);
                if (World[Layer][Row][Tile+1].crossable == true)
                {
                    World[Layer][Row][Tile+1].structure = Mob;
                    World[Layer][Row][Tile+1].crossable = false;
                    World[Layer][Row][Tile+1].mob = Mob;
                    World[Layer][Row][Tile].structure = "none";
                    World[Layer][Row][Tile].crossable = true;
                    World[Layer][Row][Tile].mob = "none";
                }
            }
            if (Mob.direction == 2)
            {
                console.log(2);
                if (World[Layer][Row+1][Tile].crossable == true)
                {
                    World[Layer][Row+1][Tile].structure = Mob;
                    World[Layer][Row+1][Tile].crossable = false;
                    World[Layer][Row+1][Tile].mob = Mob;
                    World[Layer][Row][Tile].structure = "none";
                    World[Layer][Row][Tile].crossable = true;
                    World[Layer][Row][Tile].mob = "none";
                }
            }
            if (Mob.direction == 3)
            {
                console.log(3);
                if (World[Layer][Row][Tile-1].crossable == true)
                {
                    World[Layer][Row][Tile-1].structure = Mob;
                    World[Layer][Row][Tile-1].crossable = false;
                    World[Layer][Row][Tile-1].mob = Mob;
                    World[Layer][Row][Tile].structure = "none";
                    World[Layer][Row][Tile].crossable = true;
                    World[Layer][Row][Tile].mob = "none";
                }
            }
        }
        catch(error)
        {
            console.log(error + "\nor running into a wall, stupid thing");
        }
    }
}

class Mob
{
    constructor(Name)
    {
        this.name = Name;
        this.direction = Math.round(Math.random()*3);//
        this.tools = [];
        this.armor = [];
    }
}

class Man extends Mob
{
    constructor()
    {
        super("man");
        this.health = 100;
        this.moveTime = 1000;
        this.priorityList = [];
        this.inventory = [];
        this.level = 0;
    }
}

class monster extends Mob
{
    constructor(world)
    {
        super("monster");
        this.damage = (Math.random()+5-Math.random())*world.dificulty;
        this.health = (Math.random()+20-Math.random())*world.dificulty;
        this.position = [x, y, z];
        this.exp = ((Math.random()+Math.random())*100)*world.dificulty;
    }
}

class beast extends Mob
{
    constructor(beastType)
    {
        super("beast");
        this.health = (Math.random()+20-Math.random())*world.dificulty;
        this.type = beastType;
        this.exp = ((Math.random()+Math.random())*10)*world.dificulty;
    }
}

class Tool
{
    constructor(name, type, material, hardness, level)
    {
        this.name = name;
        this.type = type;
        this.material = material;
        this.hardness = hardness;
        this.level = level;
    }
}

class Tile
{
    constructor(Type,Surface,Structure,Mob)
    {
        this.type = Type;
        this.structure = Structure;
        this.mob = "none";
        if(this.structure == "man")
        {
            this.mob == Mob;
        }
        if(this.type === "fluid" || this.structure !== "none")
        {
            this.crossable = false;
        }
        else
        {
            this.crossable = true;
        }
        if (this.type === "fluid")
        {
            this.fishable = true;
        }
        else
        {
            this.fishable = false
        }
        this.texture = "none";
        this.updateTexture(Surface);
    }
    updateTexture(layer)
    {
        if(layer === 0)
        {
            this.texture = this.updateTextureSurface();
        }
        else
        {
            this.texture = this.updateTextureUnderground();
        }
    }
    updateTextureSurface()
    {
        if(this.structure === "tree")
        {
            return ":deciduous_tree:";
        }
        else if(this.structure === "house")
        {
            return ":house_with_garden:";
        }
        else if(this.structure !== "none")
        {
            return this.updateTextureMob(this.structure);
        }
        else if(this.type === "hole")
        {
            return ":hole:";
        }
        else if(this.type === "dirt")
        {
            return ":green_square:";
        }
        else if(this.type === "fluid")
        {
            return ":blue_square:";
        }
    }
    updateTextureUnderground()
    {
        if(this.structure === "ore")
        {
            return ":white_square_button:";
        }
        else if(this.structure !== "none")
        {
            return this.updateTextureMob(this.structure);
        }
        else if(this.type === "hole")
        {
            return ":hole:";
        }
        else if(this.type === "stone")
        {
            return ":white_large_square:";
        }
        else if(this.type === "fluid")
        {
            return ":red_square:";
        }
    }
    updateTextureMob(structure)
    {
        switch (structure) {
            case "man":
                return ":man_standing:";
            case "monster":
                return ":scorpion:";
            case "beast":
                return ":cow2:";
            default:
                break;
        }
    }
}

function runWorld(timeLoopAmount, meetTime, World)
{
    var manPos = [];
    var mobPos = [];
    for (let layers = 0; layers < World.worldData.length; layers++)
    {
        const layer = World.worldData[layers];
        for (let rows = 0; rows < layer.length; rows++)
        {
            const row = layer[rows];
            for (let tiles = 0; tiles < row.length; tiles++)
            {
                const tile = row[tiles];
                if(tile.structure == "man")
                {
                    manPos.push(World.enitityList[0]);
                    manPos.push(layers);
                    manPos.push(rows);
                    manPos.push(tiles);
                }
                else if (tile.structure == "monster")
                {
                    let tempArray = [];
                    tempArray.push(tile.mob);
                    tempArray.push(layers);
                    tempArray.push(rows);
                    tempArray.push(tiles);
                    mobPos.push(tempArray);
                }
                else if (tile.structure == "beast")
                {
                    let tempArray = [];
                    tempArray.push(tile.mob);
                    tempArray.push(layers);
                    tempArray.push(rows);
                    tempArray.push(tiles);
                    mobPos.push(tempArray);
                }
            }
        }
    }
    
    for(let i = Math.floor(timeLoopAmount/1000); i < Math.round(meetTime/1000); i++)
    {
        World.move(World.worldData, manPos[0], manPos[1], manPos[2], manPos[3]);
    }
}

function compileWorldTexture(World,Level)
{
    let tempPrintOut = "";
    for(let i = 0; i < World[Level].length; i++)
    {
        for(let ii = 0; ii < World[Level][i].length; ii++)
        {
            World[Level][i][ii].updateTexture(Level);
            tempPrintOut = tempPrintOut + World[Level][i][ii].texture;
        }
        tempPrintOut = tempPrintOut + "\n";
    }
    return tempPrintOut;
}

var worlds = [];

client.on('ready', () => {
    console.log("connected as " +  client.user.tag);
});

client.on('message', (message) => {
    if(message.author.bot)
    {
        return;
    }

    if(message.content.startsWith(Prefix)){
        const [CMD, ...args] = message.content.trim().substring(Prefix.length).split(/\s+/);
        if(CMD === "help")
        {
            if(message.author.id === '208419966200971264')
            {
                //message.channel.send("Ok, Go to your site Stupid");
            }
            if(args[0] === "1")
            {
                message.channel.send("This will be a game were you build chunks for your guy to survive But beware, the more chunks you add, the more monster that invade at night. The deeper you place chunks the better resources your guy can find but harder monsters invade.");
            }
            else if(args[0] === "2")
            {
                message.channel.send("Type 'start' to start a world if you do not have one or your previous one failed.");
            }
            else if(args[0] === "3")
            {
                message.channel.send("Type 'show' to show your world. \nType 'add' to add a strip around the map.");
            }
            else
            {
                message.channel.send("This is the start of some thing big...\n\nThere are 3 help pages\n💠The first 'help 1' is a basic explanation\n💠The second 'help 2' is how to start\n💠The third 'help 3' is the commands");
            }
        }
        else if(CMD === "start")
        {
            if(args.length == 0)
            {
                let hasStarted = false;
                worlds.forEach(world => {
                    if (world.userId == message.author.id)
                    {
                        hasStarted = true;
                    }
                });
                if(hasStarted == false)
                {
                    worlds.push(new World(message.author.id, message.author.tag, message.createdTimestamp));
                    message.reply("your world has been created!");
                }
                else
                {
                    message.channel.send("You already have a world. Type '^start RESET' to reset your world.");
                }
            }
            else if(args[0] == "RESET")
            {
                let position = 0;
                let foundWorld = false;
                worlds.forEach(world => {
                    if (world.userId == message.author.id) {
                        worlds[position] = '';
                        foundWorld = true;
                        message.reply("your World has been reset.");
                    }
                    position++;
                    if(position >= worlds.length && foundWorld == false)
                    {
                        message.channel.send("You do not have a world to reset. \nType ^start to start a new world.");
                    }
                });
            }
        }
        else if(CMD === "show")
        {
            let hasStarted = false;
            worlds.forEach(world => {
                if (world.userId == message.author.id) {
                    if(args.length === 0)
                    {
                        runWorld(world.previousTime, message.createdTimestamp, world);
                        world.previousTime = message.createdTimestamp;
                        message.channel.send(compileWorldTexture(world.worldData,0));
                    }
                    else if(args[0] <= world.worldData.length-1 && args[0] >= 0)
                    {
                        runWorld(world.previousTime, message.createdTimestamp, world);
                        world.previousTime = message.createdTimestamp;
                        message.channel.send(compileWorldTexture(world.worldData,args[0]));
                    }
                    else
                    {
                        let tempReply = `Please request a valid layer\nWhole numbers between 0 and ${world.worldData.length-1} are valid`;
                        message.reply(tempReply);
                    }
                }
            });
            if (hasStarted === false) {
                message.reply("You must start a world before you can use this command.\nType ^start to get started!");
            }
            else if(hasStarted)
            {

            }
            else
            {
                message.reply("An error has occured. Please try again later when the bug has been patched. ");
            }
        }
        else if(CMD === "add")
        {
            let hasAdded = false;
            worlds.forEach(world => {
                if (world.userId == message.author.id)
                {
                    if (world.lastAdded > message.createdTimestamp - 79200)
                    {
                        hasAdded = true;
                    }
                }
            });
            if(hasAdded)
            {
                message.reply("You have already added tiles today");
            }
            else
            {
                message.channel.send("You already have a world. Type '^start RESET' to reset your world.");
            }
        }
        else if(CMD === "DEBUG")
        {
            if(message.author.id === '208419966200971264')
            {
                message.channel.send("Ok, All variabes are in the console :white_check_mark:");
                console.log(worlds);
            }
        }
        else if(CMD === "fail")
        {
            giphy.search('gifs', {"q": "fail"})
            .then((response) =>{
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * totalResponses));
            var responseFinal = response.data[responseIndex];
            message.channel.send("Smash Bros announcer: Failure", {files: [responseFinal.images.fixed_height.url]});
            console.log(worlds);
            })
        }
        else if(CMD === "WOW")
        {
            giphy.search('gifs', {"q": "wow"})
            .then((response) =>{
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            message.channel.send("Anime noise: WOW", {files: [responseFinal.images.fixed_height.url]});
            console.log(worlds);
            });
        }
        else
        {
            message.channel.send("Please use a proper command.");
        }
    }
});

client.login("NzY2MDM4MTczMzAxMDgwMDY0.X4dipA.EEMiV5vqeHwTrgBlFQuDKORSm68");

setInterval(()=>{
    worlds.sort((a,b)=>
    {
        if(b == "")
        {
            return 1;
        }
        else if(a == "")
        {
            return -1;
        }
        else
        {
            return 0;
        }
    });
    if(worlds[0] === "")
    {
        worlds.shift();
    }
},10);
