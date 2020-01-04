const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

function clean (text) {
  if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
}

client.on('message', message => {
  const args = message.content.split(' ').slice(1)

  if (message.content.startsWith('@run')) {
    try {
      const code = args.join(' ')
      // eslint-disable-next-line no-eval
      let evaled = eval(code)

      if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled) }
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }

  if (message.content.substr(message.content.length - 1) === '노') {
    message.channel.send('노? 신고합니다.')
  }
  if (message.content.substr(message.content.length - 1) === '다') {
    message.channel.send('다? 신고합니노.')
  }
  if (message.content.startsWith('@notice')) {
    const url = 'https://playentry.org/api/discuss/findNotice'
    const options = { json: true }

    request(url, options, (error, res) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode === 200) {
        console.log(res.body.length)
        for (var i = 0; i < res.body.length; i++) {
          message.channel.send(res.body[i].title)
        }
      };
    })
  }
  if (message.content.startsWith('@pop')) {
    const url = 'https://playentry.org/api/rankProject?type=best&limit=9'
    const options = { json: true }

    request(url, options, (error, res) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode === 200) {
        console.log(res.body.length)
        for (var i = 0; i < res.body.length; i++) {
          message.channel.send(res.body[i].project.name)
        }
      };
    })
  }
  if (message.content.startsWith('@staff')) {
    const url = 'https://playentry.org/api/rankProject?type=staff&limit=3'
    const options = { json: true }

    request(url, options, (error, res) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode === 200) {
        console.log(res.body.length)
        for (var i = 0; i < res.body.length; i++) {
          message.channel.send(res.body[i].project.name)
        }
      };
    })
  }
  if (message.content.startsWith('@entstat')) {
    const search = args[0]
    const getuserid = 'https://playentry.org/api/getUserByUsername/' + search
    const options = { json: true }

    request(getuserid, options, (error, res) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode === 200) {
        const userid = res.body._id
        const getstat = 'https://playentry.org/api/project/find?option=list&sort=updated&rows=0&type=project&user=' + userid
        request(getstat, options, (error, res) => {
          if (error) {
            return console.log(error)
          };

          if (!error && res.statusCode === 200) {
            for (var i = 0; i < res.body.length; i++) {
              var likes = likes + res.body.likeCnt
            }
            message.channel.send(likes)
          };
        })
      };
    })
  }
  if (message.content.startsWith('@help')) {
    const embed = {
      title: 'thoratica#4291 의 실험용 봇인 모든걸시도당하는봇의 명령어들을 안내합니다!',
      description: '​',
      url: 'https://discordapp.com',
      color: 3066993,
      footer: {
        icon_url: 'https://cdn.discordapp.com/embed/avatars/3.png',
        text: '모든걸시도당하는봇'
      },
      author: {
        name: 'thoratica',
        url: 'https://thoratica.net',
        icon_url: 'https://i.imgur.com/TidHzfY.png'
      },
      fields: [
        {
          name: '**@help**',
          value: '봇의 기본적인 코드를 안내하는 도움말 명령어!'
        },
        {
          name: '**@run**',
          value: 'JS 코드를 실행하는 최고의 명령어!'
        },
        {
          name: '**@notice**',
          value: '엔트리의 현재 유효한 공지를 불러오는 명령어!'
        },
        {
          name: '**@pop**',
          value: '엔트리의 인기 작품을 불러오는 명령어!'
        },
        {
          name: '**@staff**',
          value: '엔트리의 스태프 선정 작품을 불러오는 명령어!'
        }
      ]
    }
    message.channel.send({ embed })
  }
})

client.login('token')
