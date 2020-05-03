class ScoresController < ApplicationController
    skip_before_action :verify_authenticity_token

    def save
        user = params[:user]
        point = params[:score]
        if(user.nil? || user.empty?)
            render json: { :success => false, :message => 'User is required'}.to_json()
        elsif(point.nil?)
            render json: { :success => false, :message => 'Point is required'}.to_json()
        else
            score = Score.new
            score.user = user
            score.point = point
            score.save()
            render json: { :success => true}.to_json()
        end
        
    end
    def list        
        scores = Score.order('scores.point DESC').all.limit(5)
        render json: scores.to_json()
    end
end
