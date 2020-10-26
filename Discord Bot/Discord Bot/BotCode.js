const Discord = require('discord.js');
const { time } = require('console');
const client = new Discord.Client();
const Prefix = "^";

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
        [[[new Tile("dirt",true,"tree"),new Tile("dirt",true,"none"),new Tile("dirt",true,"none")],
        [new Tile("dirt",true,"none"),new Tile("hole",true,"none"),new Tile("fluid",true,"none")],
        [new Tile("dirt",true,"none"),new Tile("dirt",true,"none"),new Tile("dirt",true,"tree")]],

        [[new Tile("stone",false,"none"),new Tile("stone",false,"none"),new Tile("stone",false,"ore")],
        [new Tile("stone",false,"none"),new Tile("hole",false,"none"),new Tile("fluid",false,"none")],
        [new Tile("stone",false,"none"),new Tile("stone",false,"none"),new Tile("stone",false,"ore")]]];
    }
}

class mob
{
    constructor()
    {
        this.direction = Math.floor(Math.random()*3);
    }
    move(World, x, y, z)
    {
        try
        {
            if (this.direction == 0)
            {
                if (World) {
                    
                }
            }
        }
        catch(error)
        {
            console.error("running into a wall");
        }
    }
}

class Man extends mob
{
    constructor()
    {
        super();
        this.health = 100;
        this.moveTime = 1000;
        this.priorityList = [];
        this.inventory = [];
        this.tools = [];
        this.armor = [];
        this.level = 0;
    }
}

class monster extends mob
{
    constructor(world)
    {
        super();
        this.damage = (Math.random()+5-Math.random())*world.dificulty;
        this.health = (Math.random()+20-Math.random())*world.dificulty;
        this.position = [x, y, z];
        this.exp = ((Math.random()+Math.random())*100)*world.dificulty;
    }
}

class beast extends mob
{
    constructor(beastType)
    {
        super();
        this.health = (Math.random()+20-Math.random())*world.dificulty;
        this.type = beastType;
        this.exp = ((Math.random()+Math.random())*10)*world.dificulty;
    }
}

class Tool
{
    constructor(type, material, hardness, level)
    {
        this.type = type;
        this.material = material;
        this.hardness = hardness;
        this.level = level;
    }
}

class Tile
{
    constructor(Type,Surface,Structure)
    {
        this.type = Type;
        this.structure = Structure;
        this.buildTime = 20000;
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
        if(Surface)
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
        else
        {
            return this.updateTextureMob(this.structure);
        }
    }
    updateTextureUnderground()
    {
        if(this.structure === "ore")
        {
            return ":white_square_button:";
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
        else
        {
            return this.updateTextureMob(this.structure);
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
    for(let i = timeLoopAmount; i < meetTime; i++)
    {
        for (let layers = 0; height < World.worldData.length; layers++) {
            const layer = World.worldData[layers];
            for (let rows = 0; rows < layer.length; rows++) {
                const row = layer[rows];
                for (let tiles = 0; tiles < row.length; tiles++) {
                    const tile = row[tiles];
                    
                }
            }
        }
    }
}

function compileWorldTexture(World,Level)
{
    let tempPrintOut = "";
    for(let i = 0; i < World[Level].length; i++)
    {
        for(let ii = 0; ii < World[Level][i].length; ii++)
        {
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
        else
        {
            message.channel.send("Please use a proper command.");
        }
    }
});

client.login("NzY2MDM4MTczMzAxMDgwMDY0.X4dipA.nBEgat2ThSQJQ1oaGPqzgB4CjzQ");

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