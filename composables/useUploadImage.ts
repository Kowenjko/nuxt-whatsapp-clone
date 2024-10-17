import { useFileDialog, useObjectUrl } from '@vueuse/core'

export const useUploadImage = () => {
	const { open: openSelectImage, onChange } = useFileDialog({ accept: 'image/*', multiple: false })

	const selectedImage = shallowRef()
	const renderedImage = useObjectUrl(selectedImage)

	onChange((files) => (selectedImage.value = files?.[0]))

	return { selectedImage, renderedImage, openSelectImage }
}
