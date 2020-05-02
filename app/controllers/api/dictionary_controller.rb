class api::DictionaryController < ActionController::Base
    def validateword        
        render json:{
            :success => true
    }.to_json
    end
end