const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesChooser = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');


avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (file && isValidType) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imagesChooser.addEventListener('change', () => {
  const file = imagesChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isValidType) {
    imagesPreview.innerHTML = '';
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.width = '100%';
    image.style.height = 'auto';
    imagesPreview.appendChild(image);
  }
});

const resetImages = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  imagesPreview.innerHTML = '';
};

export { resetImages };
