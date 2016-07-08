$(document).ready(function () {
  if (document.querySelector('.category-delete') !== null) {
    console.log('Edit Category page requested');
    document.querySelector('.category-delete').addEventListener('click', function (e) {
      e.preventDefault();
      var deleteCatBtn = e.target;
      $.ajax({
        type: 'DELETE',
        url: '/categories/delete/' + deleteCatBtn.getAttribute('data-category-id'),
        data: {
          _csrf: deleteCatBtn.getAttribute('data-csrf'),
        },
        success(res) {
          alert('Category deleted');
          window.location.href = '/manage/categories';
        },
        error(err) {
          alert(err);
          console.log(err);
        },
      });
    });
  }

  if (document.querySelector('.article-delete') !== null) {
    console.log('Edit Article page requested');
    document.querySelector('.article-delete').addEventListener('click', function (e) {
      e.preventDefault();
      var deleteArtBtn = e.target;
      $.ajax({
        type: 'DELETE',
        url: '/articles/delete/' + deleteArtBtn.getAttribute('data-article-id'),
        data: {
          _csrf: deleteArtBtn.getAttribute('data-csrf'),
        },
        success(res) {
          alert('Article deleted');
          window.location.href = '/manage/articles';
        },
        error(err) {
          alert(err);
          console.log(err);
        },
      });
    });
  }
});
