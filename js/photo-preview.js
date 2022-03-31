const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('#preview-for-avatar');
const photoHomeInput = document.querySelector('#images');
const photoHonePreview = document.querySelector('#preview-for-home');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const makePhotoPreview = function (input, previewBlock) {
  const inputFile = input.files[0];
  const inputFileName = inputFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => inputFileName.endsWith(it));

  if (matches) {
    previewBlock.src = URL.createObjectURL(inputFile);
  }
};

avatarInput.addEventListener('change', () => makePhotoPreview(avatarInput, avatarPreview));
photoHomeInput.addEventListener('change', () => makePhotoPreview(photoHomeInput, photoHonePreview));
