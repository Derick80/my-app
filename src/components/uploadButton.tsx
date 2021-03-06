import { ChangeEventHandler } from 'react'

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>
  loading: boolean
}

export default function UploadButton(props: UploadButtonProps) {
  return (
    <div className="upload_button">
      <label htmlFor='contained-button-file'>
        {props.loading ? 'Uploading ...' : 'Upload a Picture:'}
      </label>
      <input

        type='file'
        id='single'
        accept='image/*'
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </div>
  )
}
