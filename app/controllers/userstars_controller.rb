class UserstarsController < ApplicationController
  require 'will_paginate/array'
  before_filter :validate!

  def index 
    @scroll = params[:scroll]
    @title = "Stars"
    @user = current_user
    @entries = current_user.stars.reverse.paginate(page: params[:page], per_page: 16)
    if ((Time.now - @user.weather.updated_at)/60 > 60)
      @user.weather.update_attributes(Apis::Weather.getWeather)
      @user.save
    end
    @geo = Geocoder::search(@user.location)[0]
    @tStatus = User.getTrains(@user)
    if @scroll == true
      respond_to do |format|
        format.html
        format.js
      end
    end
  end

  private
  def validate!
    if !current_user
      flash[:notice]="Sign In Already!"
      redirect_to root_path
    end
  end

end