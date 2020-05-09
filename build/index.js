"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var client = new discord_js_1.default.Client();
var dispatcher;
var connection;
var config_json_1 = require("./config.json");
client.on('debug', console.log);
client.once('ready', function () {
    //setChannelEmbed('701464024180588575')
    console.log('Ready!');
});
client.once('shardReconnecting', function () {
    console.log('Reconnecting!');
});
client.once('disconnect', function () {
    console.log('Disconnect!');
});
client.login(config_json_1.token);
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Message: ' + message.content);
        commands(message);
        return [2 /*return*/];
    });
}); });
function commands(message) {
    if (!message.content.startsWith(config_json_1.prefix) || message.author.bot)
        return;
    var command = message.content;
    if (message.content.indexOf(' ') !== -1) {
        command = command.substring(0, message.content.indexOf(' '));
    }
    switch (command) {
        case '!ping':
            commandHandler('ping', message, 'https://www.youtube.com/watch?v=gHQP6uOhCg0');
            break;
        case '!server':
            {
                var serverReply = message.guild
                    ? message.guild.name
                    : "I don't think this is a server.. right?";
                commandHandler('server', message, serverReply);
            }
            break;
        case '!music':
            handleMusicCommands(message);
            break;
        case '!ids':
            if (message.guild)
                message.reply(message.guild.id);
            break;
        default:
            message.reply('unknown command');
    }
}
function setChannelEmbed(channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channel, exampleEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('hello');
                    return [4 /*yield*/, client.channels.fetch(channelId)];
                case 1:
                    channel = (_a.sent());
                    exampleEmbed = new discord_js_1.default.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Some title')
                        .setURL('https://discord.js.org/')
                        .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                        .setDescription('Some description here')
                        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                        .addFields({ name: 'Regular field title', value: 'Some value here' }, { name: '\u200B', value: '\u200B' }, { name: 'Inline field title', value: 'Some value here', inline: true }, { name: 'Inline field title', value: 'Some value here', inline: true })
                        .addField('Inline field title', 'Some value here', true)
                        .setImage('https://i.imgur.com/wSTFkRM.png')
                        .setTimestamp()
                        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
                    channel.send(exampleEmbed);
                    return [2 /*return*/];
            }
        });
    });
}
function commandHandler(command, message, reply) {
    if (message.content.startsWith(config_json_1.prefix + command)) {
        message.channel.send(reply);
    }
}
function handleMusicCommands(message) {
    return __awaiter(this, void 0, void 0, function () {
        var args, firstArg, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    args = message.content.slice(config_json_1.prefix.length).split(/ +/);
                    firstArg = args[1];
                    if (args.length < 2) {
                        message.reply('no args given for music command');
                        return [2 /*return*/];
                    }
                    _a = firstArg;
                    switch (_a) {
                        case 'join': return [3 /*break*/, 1];
                        case 'play': return [3 /*break*/, 3];
                        case 'pause': return [3 /*break*/, 4];
                        case 'resume': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 1: return [4 /*yield*/, joinChannel(message)];
                case 2:
                    connection = _b.sent();
                    console.log(connection);
                    return [3 /*break*/, 7];
                case 3:
                    console.log('play', connection);
                    if (connection && args[2]) {
                        dispatcher = playYoutube(args[2], connection);
                    }
                    else {
                        message.reply('No link supplied in args');
                    }
                    return [3 /*break*/, 7];
                case 4:
                    if (dispatcher) {
                        dispatcher.pause();
                    }
                    return [3 /*break*/, 7];
                case 5:
                    if (dispatcher) {
                        dispatcher.resume();
                    }
                    return [3 /*break*/, 7];
                case 6: return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function joinChannel(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(message.member && message.member.voice.channel)) return [3 /*break*/, 2];
                    return [4 /*yield*/, message.member.voice.channel.join()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    message.reply('You need to join a voice channel first!');
                    return [2 /*return*/];
            }
        });
    });
}
function playYoutube(link, connection) {
    return connection.play(ytdl_core_1.default(link, {
        filter: 'audioonly',
    }), { volume: 0.5 });
}
//# sourceMappingURL=index.js.map