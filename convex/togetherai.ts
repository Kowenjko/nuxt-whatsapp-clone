import { action } from './_generated/server'
import { api } from './_generated/api'
import { v } from 'convex/values'

// Grab the API key from the set environment variable
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY!

export const chat = action({
	args: {
		messageBody: v.string(),
		conversation: v.id('conversations'),
	},
	handler: async (ctx, args) => {
		const response = await fetch('https://api.together.xyz/v1/chat/completions', {
			method: 'POST',
			headers: {
				// Set the Authorization header with your API key
				Authorization: `Bearer ${TOGETHER_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'meta-llama/Llama-Vision-Free',
				messages: [
					{
						// Provide a 'system' message giving context about how to respond
						role: 'system',
						content:
							'You are a terse bot in a group chat responding to questions with 1-sentence answers.',
					},
					{
						// Pass on the chat user's message to the AI agent
						role: 'user',
						content: args.messageBody,
					},
				],
			}),
		})

		const json = await response.json()
		const messageContent = json.choices[0].message?.content

		await ctx.runMutation(api.messages.sendChatGPTMessage, {
			content: messageContent ?? "I'm sorry, I don't have a response for that",
			conversation: args.conversation,
			messageType: 'text',
		})
	},
})

export const dall_e = action({
	args: {
		conversation: v.id('conversations'),
		messageBody: v.string(),
	},
	handler: async (ctx, args) => {
		const response = await fetch('https://api.together.xyz/v1/images/generations', {
			method: 'POST',
			headers: {
				// Set the Authorization header with your API key
				Authorization: `Bearer ${TOGETHER_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'stabilityai/stable-diffusion-xl-base-1.0',
				prompt: args.messageBody,
				steps: 20,
				n: 1,
				height: 1024,
				width: 1024,
			}),
		})

		const json = await response.json()
		const imageUrl = json.data[0].url

		await ctx.runMutation(api.messages.sendChatGPTMessage, {
			content: imageUrl ?? '/poopenai.png',
			conversation: args.conversation,
			messageType: 'image',
		})
	},
})
