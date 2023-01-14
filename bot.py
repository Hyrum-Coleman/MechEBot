import discord
from discord.ext import commands
import responses


async def send_message(message, user_message, is_private):
    try:
        response = responses.get_response(user_message)
        await message.author.send(response) if is_private else await message.channel.send(response)

    except Exception as e:
        print(e)


def run_discord_bot():
    TOKEN = 'MTA2MzUyOTU3MjA0MzMzNzgzOQ.G0t121.4G_mkpqItGAsizKCPGbVjYDIfGQ0nYLrxS1XWg'
    intents = discord.Intents.default()
    intents.message_content = True
    bot = commands.Bot(command_prefix='!', intents=intents)

    @bot.event
    async def on_ready():
        print(f'{bot.user} is now running!')

    # @bot.event
    # async def on_message(message):
    #     if message.author == bot.user:
    #         return
    #
    #     username = str(message.author)
    #     user_message = str(message.content)
    #     channel = str(message.channel)
    #
    #     print(f'{username} said: "{user_message}" ({channel})')
    #
    #     if user_message[0] == '?':
    #         user_message = user_message[1:]
    #         await send_message(message, user_message, is_private=True)
    #     else:
    #         await send_message(message, user_message, is_private=False)

    @bot.command(name='ping')
    async def ping(ctx):
        response = f"Pong! {round(bot.latency * 1000)}ms"
        await ctx.send(response)

    @bot.command(name='sleep')
    async def sleep(ctx):
        response = f"Sleeping..."
        await ctx.send(response)

    bot.run(TOKEN)