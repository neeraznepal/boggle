class DictionariesController < ApplicationController
    def validate
        word = params[:word]
        if(word.empty?)
            success = false
        else
            dictionary = Dictionary.find_by(word:word.downcase)
            if(dictionary.nil?)
                success = false
            else
                success = true
            end
        end
        render json: { :success => success}.to_json()
    end
end
