class Book < ApplicationRecord
  belongs_to :user

  validates_presence_of :title, message: 'O título é obrigatório'
end
