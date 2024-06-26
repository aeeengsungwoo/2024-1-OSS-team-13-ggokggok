from .models import Post, Comment
from rest_framework import serializers
    #PostSerializer
class CommunityPostSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Post
        fields = '__all__'
class CommunityPostVoteSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Post
        fields = ['voter']
    #CommentSerializer
class CommunityCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']

class CommunityCommentVoteSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Post
        fields = ['voter']