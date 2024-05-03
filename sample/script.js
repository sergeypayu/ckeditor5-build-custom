CKEDITOR.ClassicEditor
	.create( document.querySelector( '.editor' ), {
		fileBrowser: { browseUrl: '/api2/admin/public_storage/index?dir=blog' },
		simpleUpload: { uploadUrl: '/api2/admin/public_storage/upload?dir=blog' }
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( handleSampleError );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "cel2c1e55023-nohdljl880ze" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
