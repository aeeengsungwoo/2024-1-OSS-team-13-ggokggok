from django.db import models
from django.contrib.auth.models import User

class PlacePost(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_placepost') # 계정이 삭제되면 이 계정이 작성한 질문을 삭제하도록
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    place_id = models.CharField(max_length=30)
    #modify_date = models.DateTimeField(null=True, blank=True) 수정 일시는 일단 기능 추가 안함.
    recommended = models.ManyToManyField(User, related_name='recommended_placepost')  # 추천인 추가
    public = models.BooleanField()
    review = models.IntegerField()
    category = models.CharField(max_length=50)
    def __str__(self):
        return self.title


class PlaceComment(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_placecomment')
    placepost = models.ForeignKey(PlacePost, on_delete=models.CASCADE)
    content = models.TextField()
    recommended = models.ManyToManyField(User, related_name='recommended_placecomment')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Answer to {self.post.title} by {self.author.username}"

class PlaceInfo(models.Model):
    id = models.AutoField(primary_key=True) #등록로직변경필요
    name = models.CharField(max_length=200) #상호명
    address = models.TextField() #주소_텍스트
    lat = models.FloatField
    review = models.IntegerField() #추천 판단용 지표값
    category = models.CharField(max_length=50)
    written = models.ManyToManyField(User, related_name='written_place')  # 글 쓴 사람수 ..사용처는 미정