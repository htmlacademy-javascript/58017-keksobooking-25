const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const chooserHousingPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewHousingPhoto = document.querySelector('.ad-form__photo');

const changePhoto = (evt, type, input) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    switch (type) {
      case 'avatar':
        previewAvatar.src = URL.createObjectURL(file);
        break;
      case 'room':
        previewHousingPhoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        previewHousingPhoto.style.backgroundSize = 'cover';
        break;
    }
  }
};

const loadPhoto = () => {
  chooserAvatar.addEventListener('change', (evt) => changePhoto(evt, 'avatar', chooserAvatar));
  chooserHousingPhoto.addEventListener('change', (evt) => changePhoto(evt, 'room', chooserHousingPhoto));
};

const resetPhotos = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewHousingPhoto.style.background = '#e4e4de';
};

export {
  loadPhoto,
  resetPhotos,
};
