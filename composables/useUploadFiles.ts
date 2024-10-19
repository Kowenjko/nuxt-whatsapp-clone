import { useFileDialog, useObjectUrl } from '@vueuse/core'

export const useUploadFiles = (accept = 'image/*') => {
	const { open: openSelectFiles, reset, onChange } = useFileDialog({ accept, multiple: false })

	const selectedFiles = shallowRef()
	const renderedFiles = useObjectUrl(selectedFiles)

	onChange((files) => (selectedFiles.value = files?.[0]))

	const resetSelectFiles = () => {
		selectedFiles.value = null
		reset()
	}

	return { selectedFiles, renderedFiles, openSelectFiles, resetSelectFiles }
}
