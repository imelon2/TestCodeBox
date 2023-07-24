import discord, asyncio, datetime, pytz

client = discord.Client(intents=discord.Intents.default())

# @client.event
# async def on_ready(): # 봇이 실행되면 한 번 실행됨
#     print("이 문장은 Python의 내장 함수를 출력하는 터미널에서 실행됩니다\n지금 보이는 것 처럼 말이죠")
#     await client.change_presence(status=discord.Status.online, activity=discord.Game("봇의 상태매세지"))

@client.event
async def on_message(message):
#    if message.content == "특정입력":
        # ch = client.get_channel(929397287199866881)
        ch = client.get_channel(577678612644364308)
        await ch.send ("faucet-mumbai 0xd644352A429F3fF3d21128820DcBC53e063685b1")

# 봇을 실행시키기 위한 토큰을 작성해주는 곳
client.run('MTEzMDc4Mzc4NzI5MTI1MDc3OQ.Govz6e.oj5MaUKs4o9IwYTFReiGNJJUbr0cmuS8zCGcUM')