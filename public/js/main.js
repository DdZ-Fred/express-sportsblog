$(document).ready(function () {
  document.querySelector('.category-delete').addEventListener('click', function (e) {
    e.preventDefault();
    var deleteBtn = e.target;
    $.ajax({
      type: 'DELETE',
      url: '/categories/delete/' + deleteBtn.getAttribute('data-category-id'),
      data: {
        _csrf: deleteBtn.getAttribute('data-csrf'),
      },
      success(res) {
        alert('Category removed');
        window.location.href = '/manage/categories';
      },
      error(err) {
        alert(err);
        console.log(err);
      },
    });
  });
});
